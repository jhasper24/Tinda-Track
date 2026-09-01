"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { AppLink } from "@/components/shared/AppLink"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"

const signInSchema = z.object({
  email: z.email().min(1, "Email is required."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(64, "Password cannot be longer than 64 characters."),
})

export function SignInForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { isSubmitting } = form.formState

  async function handleSignIn(data: z.infer<typeof signInSchema>) {
    await authClient.signIn.email(
      { ...data },
      {
        onError: (error) => {
          toast.add({ type: "error", description: error.error.message, priority: "high" })
        },
        onSuccess: () => {
          router.refresh()
          router.replace("/dashboard")
        },
      },
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" id="sign-in-form" onSubmit={form.handleSubmit(handleSignIn)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full" type="submit" disabled={isSubmitting} form="sign-in-form">
          {isSubmitting ? <Spinner /> : "Submit"}
        </Button>
        <span>
          New to TindaTrack? <AppLink href="/signup">Sign Up</AppLink>
        </span>
      </CardFooter>
    </Card>
  )
}
