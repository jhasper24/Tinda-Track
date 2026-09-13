import { cache } from "react"
import { db } from "@/drizzle/db"
import { getCurrentSession } from "./session"

export const findStoreByOwnerId = cache(async (ownerId: string) => {
  return await db.query.store.findFirst({
    where: {
      ownerId,
    },
  })
})
export const getSessionAndStore = cache(async () => {
  const session = await getCurrentSession()
  const store = session ? await findStoreByOwnerId(session.user.id) : null
  return { session, store }
})
