import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { getSessionAndStore } from "@/dal/store"
import { NoStoreState } from "../_components/NoStoreState"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const { session, store } = await getSessionAndStore()
  if (session == null) return redirect("/signin")
  if (store == null) return <NoStoreState />

  return (
    <div className="flex flex-1 flex-col space-y-2 p-2">
      <div className="flex gap-2">
        <Card className="h-56 flex-1 bg-gray-100"></Card>
        <Card className="h-56 flex-1 bg-gray-100"></Card>
        <Card className="h-56 flex-1 bg-gray-100"></Card>
      </div>
      <Card className="h-full bg-gray-100"></Card>
    </div>
  )
}
