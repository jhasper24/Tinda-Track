"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(100, "Name cannot be longer than 100 characters."),
  email: z.email().min(1, "Email is required."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(64, "Password cannot be longer than 64 characters."),
})

export default function SignUpPage() {
  const router = useRouter()
  const { data, isPending } = authClient.useSession()

  useEffect(() => {
    if (data && !isPending) {
      router.push("/dashboard")
    }
  }, [data, isPending, router])

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const { isSubmitting } = form.formState

  async function handleSignUp(data: z.infer<typeof signUpSchema>) {
    await authClient.signUp.email(
      { ...data },
      {
        onError: (error) => {
          toast.add({ type: "error", description: error.error.message, priority: "high" })
        },
        onSuccess: () => {
          router.push("/dashboard")
        },
      },
    )
  }

  if (isPending || data) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" id="sign-up-form" onSubmit={form.handleSubmit(handleSignUp)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input {...field} id="name" aria-invalid={fieldState.invalid}></Input>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            ></Controller>

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
                    aria-invalid={fieldState.invalid}
                  ></Input>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            ></Controller>

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
                    aria-invalid={fieldState.invalid}
                  ></Input>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            ></Controller>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button className={"w-full"} type="submit" disabled={isSubmitting} form="sign-up-form">
          {isSubmitting ? <Spinner /> : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  )
}
