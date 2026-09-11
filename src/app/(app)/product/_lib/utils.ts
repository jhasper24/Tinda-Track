import { parseNumber, pesoFormatter } from "@/lib/utils"

type ProductPricingInput = {
  cost: string | number
  markupType: "percent" | "fixed"
  markupValue: string | number
}

export function computeSellingPrice(product: ProductPricingInput) {
  const cost = parseNumber(product.cost)
  const markupValue = parseNumber(product.markupValue)
  return product.markupType === "percent" ? cost * (1 + markupValue / 100) : cost + markupValue
}

export function getProductPricing(product: ProductPricingInput) {
  const cost = parseNumber(product.cost)
  const markupValue = parseNumber(product.markupValue)
  const sellingPrice = computeSellingPrice(product)
  const markupLabel =
    product.markupType === "percent" ? `${markupValue}%` : pesoFormatter.format(markupValue)

  return { cost, markupValue, sellingPrice, markupLabel }
}
