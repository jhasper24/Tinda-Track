import type { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { SignInForm } from "./_components/SignInForm"

export const metadata: Metadata = { title: "Sign in" }

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session) {
    redirect("/dashboard")
  }

  return <SignInForm />
}
