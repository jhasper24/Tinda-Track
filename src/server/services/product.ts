import { insertProduct } from "../dal/product"
import type { AddProductInput } from "../schemas/product"

export async function addProductService(data: AddProductInput & { storeId: string }) {
  await insertProduct(data)
}
