import { db } from "@/drizzle/db"
import { getCurrentSession } from "./session"

export async function findStoreByOwnerId(ownerId: string) {
  return await db.query.store.findFirst({
    where: {
      ownerId,
    },
  })
}

export async function getSessionAndStore() {
  const session = await getCurrentSession()
  const store = session ? await findStoreByOwnerId(session.user.id) : null

  return { session, store }
}
