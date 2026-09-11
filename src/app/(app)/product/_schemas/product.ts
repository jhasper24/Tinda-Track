import { createInsertSchema } from "drizzle-orm/zod"
import z from "zod"
import { product } from "@/drizzle/schema"

export const productSchema = createInsertSchema(product, {
  cost: () => z.coerce.number().positive().max(99_999_999.99),
  markupValue: () => z.coerce.number().positive().max(99_999_999.99),
}).omit({
  id: true,
  storeId: true,
  createdAt: true,
  updatedAt: true,
})

export type Product = z.infer<typeof productSchema>
