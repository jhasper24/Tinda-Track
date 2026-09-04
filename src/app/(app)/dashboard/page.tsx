import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/server/dal/session"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const session = await getCurrentUser()
  if (session == null) return redirect("/signin")

  return <h1>Welcome {session.user.name}!</h1>
}
