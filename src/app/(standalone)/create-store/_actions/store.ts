"use server"

import { getCurrentUser } from "@/dal/session"
import type { ActionResult } from "@/lib/types"
import { createStoreSchema } from "@/schemas/store"
import { createStoreService } from "../_services/store"

export async function createStoreAction(data: unknown): Promise<ActionResult> {
  const session = await getCurrentUser()
  if (session == null) return { success: false, error: "Unauthenticated." }

  const parsed = createStoreSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: "Invalid data." }

  const res = await createStoreService({ ...parsed.data, ownerId: session.user.id })

  if (!res.success) return { success: false, error: res.error }

  return { success: true }
}
