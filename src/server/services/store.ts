import type { CreateStoreInput } from "@/schemas/store"
import { findStoreByOwnerId, insertStore } from "../dal/store"

export async function createStoreService(data: CreateStoreInput & { ownerId: string }) {
  const existingStore = await findStoreByOwnerId(data.ownerId)
  if (existingStore) return { success: false as const, error: "You already have a store." }

  await insertStore(data)
  return { success: true as const }
}
