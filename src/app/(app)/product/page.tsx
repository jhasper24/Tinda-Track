import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSessionAndStore } from "@/dal/store"
import { NoStoreState } from "../_components/NoStoreState"
import { AddProductDialog } from "./_components/AddProductDialog"
import { ProductTable } from "./_components/ProductTable"
import { findProducts } from "./_dal/product"

export const metadata: Metadata = { title: "Product" }

export default async function ProductPage() {
  const { session, store } = await getSessionAndStore()
  if (session == null) return redirect("/signin")
  if (store == null) return <NoStoreState />

  const products = await findProducts(store.id)

  return (
    <div className="p-2">
      <AddProductDialog />
      <ProductTable products={products} />
    </div>
  )
}
