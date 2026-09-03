import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { signOutAction } from "@/server/actions/auth"
import { getCurrentUser } from "@/server/dal/session"
import { findStoreByOwnerId } from "@/server/dal/store"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const session = await getCurrentUser()
  if (session == null) return redirect("/signin")

  const store = await findStoreByOwnerId(session.user.id)

  return (
    <>
      <h1>Dashboard, Welcome {session.user.name}!</h1>
      {store ? (
        <p>Store: {store.name}</p>
      ) : (
        <Link href={"/create-store"} className={buttonVariants()}>
          Create Store
        </Link>
      )}
      <form action={signOutAction}>
        <Button variant={"destructive"} type="submit">
          Log out
        </Button>
      </form>
    </>
  )
}
