"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import type z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { createStoreSchema } from "@/schemas/store"
import { createStoreAction } from "@/server/actions/store"

type CreateStoreForm = z.infer<typeof createStoreSchema>

export function CreateStoreForm() {
  const router = useRouter()
  const form = useForm<CreateStoreForm>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(data: CreateStoreForm) {
    const res = await createStoreAction(data)

    if (res.success) {
      toast.add({
        type: "success",
        description: "Store created successfully!",
        priority: "high",
      })
      router.refresh()
      router.replace("/dashboard")
    } else {
      toast.add({
        type: "error",
        description: res.error,
        priority: "high",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to TindaTrack!</CardTitle>
        <CardDescription>Let's set up your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="createStore" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name">Store Name</FieldLabel>
                <Input {...field} id="name" autoComplete="off" disabled={isSubmitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit" form="createStore" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Create"}
        </Button>
      </CardFooter>
    </Card>
  )
}
