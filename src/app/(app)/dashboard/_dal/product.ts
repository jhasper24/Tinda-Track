import { eq } from "drizzle-orm"
import { db } from "@/drizzle/db"
import { product } from "@/drizzle/schema"

export async function countProducts(storeId: string) {
  return await db.$count(product, eq(product.storeId, storeId))
}
