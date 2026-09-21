import { Controller, type UseFormReturn } from "react-hook-form"
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
import { markupTypeItems, type ProductInput, type ProductOutput } from "../_schemas/product"
import { BulkCostCalculator } from "./BulkCostCalculator"

type ProductFormFieldProps = {
  form: UseFormReturn<ProductInput, unknown, ProductOutput>
  isSubmitting: boolean
  sellingPrice: number
  sellingPriceError: string | null
  onSellingPriceChange: (value: string) => void
}
export function ProductFormField({
  form,
  isSubmitting,
  sellingPrice,
  sellingPriceError,
  onSellingPriceChange,
}: ProductFormFieldProps) {
  return (
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
            <div className="flex gap-2">
              <Input
                {...field}
                id="cost"
                autoComplete="off"
                type="number"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              <BulkCostCalculator
                disabled={isSubmitting}
                onApply={(computedCost) => {
                  form.setValue("cost", computedCost, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }}
              />
            </div>
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

      <Field>
        <FieldLabel htmlFor="sellingPrice">Selling Price</FieldLabel>
        <Input
          id="sellingPrice"
          type="number"
          step="any"
          autoComplete="off"
          disabled={isSubmitting}
          value={sellingPrice === 0 ? "" : parseFloat(sellingPrice.toFixed(2))}
          onChange={(e) => onSellingPriceChange(e.target.value)}
          aria-invalid={!!sellingPriceError}
        />
        {sellingPriceError && <FieldError>{sellingPriceError}</FieldError>}
      </Field>
    </FieldGroup>
  )
}
