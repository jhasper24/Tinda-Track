"use server"

import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/dal/session"
import { findStoreByOwnerId } from "@/dal/store"
import type { ActionResult } from "@/lib/types"
import { findProductById } from "../_dal/product"
import { addProductSchema } from "../_schemas/product"
import { addProductService, deleteProductService, updateProductService } from "../_services/product"

export async function addProductAction(input: unknown): Promise<ActionResult> {
  const session = await getCurrentUser()
  if (session == null) return { success: false, error: "Unauthorized" }

  const store = await findStoreByOwnerId(session.user.id)
  if (store == null) return { success: false, error: "No store found" }

  const parsed = addProductSchema.safeParse(input)
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input." }

  await addProductService({ ...parsed.data, storeId: store.id })

  return { success: true }
}

export async function updateProductAction(id: string, input: unknown): Promise<ActionResult> {
  const session = await getCurrentUser()
  if (session == null) return { success: false, error: "Unauthorized" }

  const store = await findStoreByOwnerId(session.user.id)
  if (store == null) return { success: false, error: "No store found" }

  const existing = await findProductById(id, store.id)
  if (existing == null) return { success: false, error: "Product not found" }

  const parsed = addProductSchema.safeParse(input)
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input." }

  await updateProductService({ ...parsed.data, id, storeId: store.id })
  revalidatePath(`/product/${id}`)
  revalidatePath("/product")

  return { success: true }
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  const session = await getCurrentUser()
  if (session == null) return { success: false, error: "Unauthorized" }

  const store = await findStoreByOwnerId(session.user.id)
  if (store == null) return { success: false, error: "No store found" }

  const existing = await findProductById(id, store.id)
  if (existing == null) return { success: false, error: "Product not found" }

  await deleteProductService(id, store.id)
  revalidatePath("/product")
  revalidatePath(`/product/${id}`)

  return { success: true }
}
