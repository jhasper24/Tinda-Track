// src/app/(app)/product/_hooks/useProductForm.ts

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { parseNumber } from "@/lib/utils"
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
  const sellingPriceError =
    sellingPrice < parseNumber(cost) ? "Selling price cannot be lower than cost." : null

  function handleSellingPriceChange(value: string | number) {
    form.setValue("markupType", "fixed", { shouldValidate: true, shouldDirty: true })

    if (value === "") {
      form.setValue("markupValue", "", { shouldValidate: true, shouldDirty: true })
      return
    }

    const numericCost = parseNumber(cost)
    const numericSellingPrice = parseNumber(value)
    const diff = (numericSellingPrice - numericCost).toFixed(2)

    form.setValue("markupValue", diff, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  return {
    form,
    isSubmitting,
    cost,
    markupValue,
    markupType,
    sellingPrice,
    sellingPriceError,
    handleSellingPriceChange,
  }
}
