import { eq } from "drizzle-orm"
import { db } from "@/drizzle/db"
import { product } from "@/drizzle/schema"
import type { AddProductInput } from "../schemas/product"

export async function insertProduct(data: AddProductInput & { storeId: string }) {
  return await db
    .insert(product)
    .values({ ...data, cost: String(data.cost), markupValue: String(data.markupValue) })
}

export async function findProductByStoreId(storeId: string) {
  return await db.query.product.findMany({
    where: {
      storeId,
    },
  })
}

export async function findProductById(id: string, storeId: string) {
  return await db.query.product.findFirst({
    where: {
      id,
      storeId,
    },
  })
}

export async function updateProduct(data: AddProductInput & { id: string }) {
  return await db
    .update(product)
    .set({ ...data, cost: String(data.cost), markupValue: String(data.markupValue) })
    .where(eq(product.id, data.id))
}
