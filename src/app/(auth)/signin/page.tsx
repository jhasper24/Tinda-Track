import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/dal/session"
import { SignInForm } from "./_components/SignInForm"

export const metadata: Metadata = { title: "Sign in" }

export default async function SignInPage() {
  const session = await getCurrentUser()

  if (session) return redirect("/dashboard")

  return <SignInForm />
}
