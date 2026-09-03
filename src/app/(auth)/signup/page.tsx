import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/server/dal/session"
import { SignUpForm } from "./_components/SignUpForm"

export const metadata: Metadata = { title: "Sign up" }

export default async function SignUpPage() {
  const session = await getCurrentUser()

  if (session) return redirect("/dashboard")

  return <SignUpForm />
}
