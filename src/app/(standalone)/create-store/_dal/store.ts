import { db } from "@/drizzle/db"
import { store } from "@/drizzle/schema"
import type { CreateStoreInput } from "@/schemas/store"

export async function insertStore(data: CreateStoreInput & { ownerId: string }) {
  await db.insert(store).values(data)
}
