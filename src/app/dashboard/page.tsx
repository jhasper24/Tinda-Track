import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { signOutAction } from "@/server/actions/auth"

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) redirect("/sign-in")

  return (
    <div>
      <h1>Dashboard, Welcome {session.user.name}!</h1>
      <Button variant={"destructive"} onClick={signOutAction}>
        Log out
      </Button>
    </div>
  )
}
