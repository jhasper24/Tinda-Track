import { deleteProduct, insertProduct, updateProduct } from "../_dal/product"
import type { Product } from "../_schemas/product"

export async function addProductService(data: Product & { storeId: string }) {
  await insertProduct(data)
}

export async function updateProductService(data: Product & { id: string; storeId: string }) {
  await updateProduct(data)
}

export async function deleteProductService(id: string, storeId: string) {
  await deleteProduct(id, storeId)
}
