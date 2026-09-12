import { and, eq } from "drizzle-orm"
import { db } from "@/drizzle/db"
import { product } from "@/drizzle/schema"
import type { ProductOutput } from "../_schemas/product"

export async function upsertProduct({
  id,
  storeId,
  data,
}: {
  id?: string
  storeId: string
  data: ProductOutput
}) {
  return await db
    .insert(product)
    .values({ ...data, storeId, id })
    .onConflictDoUpdate({ target: product.id, set: data, where: eq(product.storeId, storeId) })
}

export async function deleteProduct({ id, storeId }: { id: string; storeId: string }) {
  return await db.delete(product).where(and(eq(product.id, id), eq(product.storeId, storeId)))
}

export async function findProduct({ id, storeId }: { id: string; storeId: string }) {
  return await db.query.product.findFirst({
    where: { id, storeId },
  })
}

export async function findProducts(storeId: string) {
  return await db.query.product.findMany({
    where: {
      storeId,
    },
  })
}
