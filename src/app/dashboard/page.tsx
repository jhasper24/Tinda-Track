import { Button } from "@/components/ui/button"
import { verifySession } from "@/lib/dal"
import { signOutAction } from "@/server/actions/auth"

export default async function DashboardPage() {
  const session = await verifySession()

  return (
    <div>
      <h1>Dashboard, Welcome {session.user.name}!</h1>
      <Button variant={"destructive"} onClick={signOutAction}>
        Log out
      </Button>
    </div>
  )
}
