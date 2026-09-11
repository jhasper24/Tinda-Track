import z from "zod"

export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required.").max(200, "Name must be less than 200 characters."),
  cost: z.coerce
    .number()
    .positive("Cost must be greater than 0.")
    .max(99_999_999.99, "Cost must be less than 99,999,999.99."),
  markupType: z.enum(["percent", "fixed"], { message: "Invalid markup type." }),
  markupValue: z.coerce
    .number()
    .positive("Markup must be greater than 0.")
    .max(99_999_999.99, "Markup must be less than 99,999,999.99."),
})

export type ProductFormInput = z.infer<typeof productFormSchema>

export const markupTypeItems = [
  { value: "percent", label: "%" },
  { value: "fixed", label: "₱" },
] as const
