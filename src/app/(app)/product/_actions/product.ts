"use server"

import { revalidatePath } from "next/cache"
import z from "zod"
import { getSessionAndStore } from "@/dal/store"
import { AppError } from "@/lib/error"
import type { ActionResult } from "@/lib/types"
import { deleteProduct, findProduct, upsertProduct } from "../_dal/product"
import { type ProductOutput, productSchema } from "../_schemas/product"

export async function addProductAction(input: ProductOutput): Promise<ActionResult> {
  try {
    const { session, store } = await getSessionAndStore()
    if (session == null) throw new AppError("Unauthorized")
    if (store == null) throw new AppError("No store found")

    const data = productSchema.parse(input)

    await upsertProduct({ data, storeId: store.id })
    revalidatePath("/product")

    return { success: true }
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message }
    }
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Invalid input." }
    }
    console.log("addProductAction", error)
    return { success: false, error: "Something went wrong" }
  }
}

export async function updateProductAction(id: string, input: ProductOutput): Promise<ActionResult> {
  try {
    const { session, store } = await getSessionAndStore()
    if (session == null) throw new AppError("Unauthorized")
    if (store == null) throw new AppError("No store found")

    const existing = await findProduct({ id, storeId: store.id })
    if (existing == null) throw new AppError("Product not found")

    const data = productSchema.parse(input)
    await upsertProduct({ data, id, storeId: store.id })
    revalidatePath(`/product/${id}`)
    revalidatePath("/product")

    return { success: true }
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message }
    }
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Invalid input." }
    }
    console.log("updateProductAction", error)
    return { success: false, error: "Something went wrong" }
  }
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  try {
    const { session, store } = await getSessionAndStore()
    if (session == null) throw new AppError("Unauthorized")
    if (store == null) throw new AppError("No store found")

    const existing = await findProduct({ id, storeId: store.id })
    if (existing == null) throw new AppError("Product not found")

    await deleteProduct({ id, storeId: store.id })
    revalidatePath("/product")
    revalidatePath(`/product/${id}`)

    return { success: true }
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message }
    }
    console.log("deleteProductAction", error)
    return { success: false, error: "Something went wrong" }
  }
}
