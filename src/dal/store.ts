import { db } from "@/drizzle/db"

export async function findStoreByOwnerId(ownerId: string) {
  return await db.query.store.findFirst({
    where: {
      ownerId,
    },
  })
}
