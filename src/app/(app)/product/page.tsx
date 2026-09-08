import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { findProductByStoreId } from "@/server/dal/product"
import { getCurrentUser } from "@/server/dal/session"
import { findStoreByOwnerId } from "@/server/dal/store"
import { AddProductDialog } from "./_components/AddProductDialog"
import { ProductTable } from "./_components/ProductTable"

export const metadata: Metadata = { title: "Product" }

export default async function ProductPage() {
  const session = await getCurrentUser()
  if (session == null) return redirect("/signin")

  const store = await findStoreByOwnerId(session.user.id)

  if (store == null) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="font-medium">You don't have a store yet.</div>
        <Link href="/create-store" className={buttonVariants()}>
          Create Store
        </Link>
      </div>
    )
  }

  const products = await findProductByStoreId(store.id)

  return (
    <div className="p-2">
      <AddProductDialog />
      <ProductTable products={products} />
    </div>
  )
}
