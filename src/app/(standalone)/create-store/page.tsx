import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/dal/session"
import { findStoreByOwnerId } from "@/dal/store"
import { CreateStoreForm } from "./_components/CreateStoreForm"

export const metadata: Metadata = { title: "Create Store" }

export default async function CreateStorePage() {
  const session = await getCurrentUser()
  if (session == null) return redirect("/signin")

  const store = await findStoreByOwnerId(session.user.id)
  if (store != null) redirect("/dashboard")

  return (
    <main className="flex min-h-svh w-full items-center justify-center">
      <div className="w-full max-w-md">
        <CreateStoreForm />
      </div>
    </main>
  )
}
