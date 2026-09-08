"use server"

import type { ActionResult } from "@/lib/types"
import { getCurrentUser } from "../dal/session"
import { findStoreByOwnerId } from "../dal/store"
import { addProductSchema } from "../schemas/product"
import { addProductService } from "../services/product"

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
