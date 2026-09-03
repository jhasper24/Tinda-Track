import { redirect } from "next/navigation"
import { getCurrentUser } from "@/server/dal/session"
import { findStoreByOwnerId } from "@/server/dal/store"
import { CreateStoreForm } from "./_components/CreateStoreForm"

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
