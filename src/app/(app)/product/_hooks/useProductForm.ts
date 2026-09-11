import { zodResolver } from "@hookform/resolvers/zod"
import { type Resolver, useForm, useWatch } from "react-hook-form"
import { computeSellingPrice } from "../_lib/utils"
import { type ProductFormInput, productFormSchema } from "../_schemas/product-form"

export function useProductForm(defaultValues: ProductFormInput) {
  const form = useForm<ProductFormInput>({
    defaultValues,
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormInput>,
  })
  const { isSubmitting } = form.formState
  const [cost, markupValue, markupType] = useWatch({
    name: ["cost", "markupValue", "markupType"],
    control: form.control,
  })
  const sellingPrice = computeSellingPrice({ cost, markupValue, markupType })

  return { form, isSubmitting, cost, markupValue, markupType, sellingPrice }
}
