import type { Metadata } from "next"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { verifySession } from "@/lib/dal"
import { signOutAction } from "@/server/actions/auth"
import { findStoreByOwnerId } from "@/server/dal/store"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const session = await verifySession()
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
      <Button variant={"destructive"} onClick={signOutAction}>
        Log out
      </Button>
    </>
  )
}
