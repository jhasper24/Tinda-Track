import z from "zod"

export const createStoreSchema = z.object({
  name: z
    .string()
    .min(1, "Store name is required.")
    .max(50, "Store name must be 50 characters or less."),
})
export type CreateStoreInput = z.infer<typeof createStoreSchema>
