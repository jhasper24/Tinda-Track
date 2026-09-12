import z from "zod"
import type { product } from "@/drizzle/schema"

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(200, "Name must be less than 200 characters."),
  cost: z.coerce
    .number<string>()
    .positive("Cost must be greater than 0.")
    .max(99_999_999.99, "Cost must be less than 99,999,999.99.")
    .transform((val) => String(val)),
  markupType: z.enum(["percent", "fixed"], { message: "Invalid markup type." }),
  markupValue: z.coerce
    .number<string>()
    .positive("Markup must be greater than 0.")
    .max(99_999_999.99, "Markup must be less than 99,999,999.99.")
    .transform((val) => String(val)),
})

export type ProductOutput = z.output<typeof productSchema>
export type ProductInput = z.input<typeof productSchema>

export type Product = typeof product.$inferSelect

export const markupTypeItems = [
  { value: "percent", label: "%" },
  { value: "fixed", label: "₱" },
] as const
