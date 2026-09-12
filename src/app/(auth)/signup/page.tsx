import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentSession } from "@/dal/session"
import { SignUpForm } from "./_components/SignUpForm"

export const metadata: Metadata = { title: "Sign up" }

export default async function SignUpPage() {
  const session = await getCurrentSession()

  if (session) return redirect("/dashboard")

  return <SignUpForm />
}
