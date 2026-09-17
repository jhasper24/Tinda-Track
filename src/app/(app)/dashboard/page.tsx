import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { getSessionAndStore } from "@/dal/store"
import { NoStoreState } from "../_components/NoStoreState"
import { RecentlyAddedTable } from "./_components/RecentlyAddedTable"
import { RecentlyUpdatedTable } from "./_components/RecentlyUpdatedTable"
import { StatsCard } from "./_components/StatCard"
import {
  countProducts,
  findRecentlyAddedProducts,
  findRecentlyUpdatedProducts,
} from "./_dal/product"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const { session, store } = await getSessionAndStore()
  if (session == null) return redirect("/signin")
  if (store == null) return <NoStoreState />
  const [productCount, recentAddedProducts, recentUpdatedProducts] = await Promise.all([
    countProducts(store.id),
    findRecentlyAddedProducts(store.id),
    findRecentlyUpdatedProducts(store.id),
  ])
  return (
    <div className="flex flex-1 flex-col space-y-4 p-2">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatsCard title="Total Products" value={productCount.toString()} />
        <Card className="h-48 w-full bg-gray-100"></Card>
        <Card className="h-48 w-full bg-gray-100 md:col-span-2 xl:col-span-1"></Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recently Added</CardTitle>
          </CardHeader>
          <RecentlyAddedTable products={recentAddedProducts} />
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recently Updated</CardTitle>
          </CardHeader>
          <RecentlyUpdatedTable products={recentUpdatedProducts} />
        </Card>
      </div>
    </div>
  )
}
