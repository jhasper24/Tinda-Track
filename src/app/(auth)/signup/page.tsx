import type { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { SignUpForm } from "./_components/SignUpForm"

export const metadata: Metadata = { title: "Sign up" }

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session) {
    redirect("/dashboard")
  }

  return <SignUpForm />
}
