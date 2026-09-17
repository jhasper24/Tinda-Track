import { eq } from "drizzle-orm"
import { db } from "@/drizzle/db"
import { product } from "@/drizzle/schema"

export async function countProducts(storeId: string) {
  return await db.$count(product, eq(product.storeId, storeId))
}

export async function findRecentlyAddedProducts(storeId: string) {
  return db.query.product.findMany({ where: { storeId }, limit: 5, orderBy: { createdAt: "desc" } })
}

export async function findRecentlyUpdatedProducts(storeId: string) {
  return db.query.product.findMany({
    where: {
      storeId,
      RAW: (t, { gt }) => gt(t.updatedAt, t.createdAt),
    },
    limit: 5,
    orderBy: { updatedAt: "desc" },
    columns: {
      id: true,
      name: true,
      updatedAt: true,
    },
  })
}

export type RecentlyAddedProduct = Awaited<ReturnType<typeof findRecentlyAddedProducts>>[number]
export type RecentlyUpdatedProduct = Awaited<ReturnType<typeof findRecentlyUpdatedProducts>>[number]
