"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, type Resolver, useForm, useWatch } from "react-hook-form"
import z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { parseNumber, pesoFormatter } from "@/lib/utils"
import { addProductAction } from "@/server/actions/product"

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required.").max(200, "Name must be less than 200 characters."),
  cost: z.coerce
    .number()
    .positive("Cost must be greater than 0.")
    .max(99_999_999.99, "Cost must be less than 99,999,999.99."),
  markupType: z.enum(["percent", "fixed"], { message: "Invalid markup type." }),
  markupValue: z.coerce
    .number()
    .positive("Markup must be greater than 0.")
    .max(99_999_999.99, "Markup must be less than 99,999,999.99."),
})

type ProductFormInput = z.infer<typeof productFormSchema>

const markupTypeItems = [
  { value: "percent", label: "%" },
  { value: "fixed", label: "₱" },
]

export function AddProductDialog() {
  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormInput>,
    defaultValues: {
      name: "",
      cost: "" as unknown as number,
      markupValue: "" as unknown as number,
      markupType: "percent",
    },
  })
  const { isSubmitting } = form.formState
  const [cost, markupValue, markupType] = useWatch({
    name: ["cost", "markupValue", "markupType"],
    control: form.control,
  })

  const sellingPrice =
    markupType === "percent"
      ? parseNumber(cost) * (1 + parseNumber(markupValue) / 100)
      : parseNumber(cost) + parseNumber(markupValue)

  async function onSubmit(data: ProductFormInput) {
    const result = await addProductAction(data)
    if (result.success) {
      form.reset()
      form.setFocus("name")
      toast.add({ type: "success", description: "Product added successfully.", priority: "high" })
    } else {
      toast.add({ type: "error", description: result.error, priority: "high" })
    }
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Add Product</DialogTrigger>
      <DialogContent>
        <DialogHeader>Add Product</DialogHeader>
        <form id="addProductForm" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="name">Product Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="cost"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="items-baseline" htmlFor="cost">
                    Cost
                    <span className="font-normal text-muted-foreground text-xs">(Per Piece)</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="cost"
                    autoComplete="off"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="flex gap-2">
              <Controller
                name="markupValue"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="items-baseline truncate" htmlFor="markupValue">
                      Markup Value
                    </FieldLabel>
                    <Input
                      {...field}
                      id="markupValue"
                      autoComplete="off"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="markupType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex-1/3">
                    <FieldLabel className="items-baseline" htmlFor="markupType">
                      Type
                    </FieldLabel>
                    <Select
                      items={markupTypeItems}
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="markupType" aria-invalid={fieldState.invalid}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {markupTypeItems.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </form>

        <div className="flex flex-col rounded-md border border-border p-5">
          <span className="text-muted-foreground text-xs">Selling Price</span>
          <span className="text-xl">{pesoFormatter.format(sellingPrice)}</span>
        </div>

        <DialogFooter>
          <Button disabled={isSubmitting} type="submit" form="addProductForm">
            {isSubmitting ? <Spinner /> : "Add Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
