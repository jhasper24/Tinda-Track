import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { computeSellingPrice } from "../_lib/utils"
import { type ProductInput, type ProductOutput, productSchema } from "../_schemas/product"

export function useProductForm(defaultValues: ProductInput) {
  const form = useForm<ProductInput, unknown, ProductOutput>({
    defaultValues,
    resolver: zodResolver(productSchema),
  })
  const { isSubmitting } = form.formState
  const [cost, markupValue, markupType] = useWatch({
    name: ["cost", "markupValue", "markupType"],
    control: form.control,
  })
  const sellingPrice = computeSellingPrice({ cost, markupValue, markupType })

  return { form, isSubmitting, cost, markupValue, markupType, sellingPrice }
}
