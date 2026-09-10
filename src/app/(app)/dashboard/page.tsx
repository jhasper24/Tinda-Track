import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getCurrentUser } from "@/dal/session"
import { findStoreByOwnerId } from "@/dal/store"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
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
