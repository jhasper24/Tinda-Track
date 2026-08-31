import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) redirect("/sign-up")

  return <h1>Dashboard, Welcome {session.user.name}!</h1>
}
