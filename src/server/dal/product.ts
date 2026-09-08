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
