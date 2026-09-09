import { deleteProduct, insertProduct, updateProduct } from "../dal/product"
import type { AddProductInput } from "../schemas/product"

export async function addProductService(data: AddProductInput & { storeId: string }) {
  await insertProduct(data)
}

export async function updateProductService(
  data: AddProductInput & { id: string; storeId: string },
) {
  await updateProduct(data)
}

export async function deleteProductService(id: string, storeId: string) {
  await deleteProduct(id, storeId)
}
