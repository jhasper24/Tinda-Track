"use client"

import { Calculator } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { parseNumber, pesoFormatter } from "@/lib/utils"

type BulkCostCalculatorProps = {
  onApply: (cost: string) => void
  disabled?: boolean
}

export function BulkCostCalculator({ onApply, disabled }: BulkCostCalculatorProps) {
  const [open, setOpen] = useState(false)
  const [totalCost, setTotalCost] = useState("")
  const [quantity, setQuantity] = useState("")

  const numTotal = parseNumber(totalCost)
  const numQty = parseNumber(quantity)
  const computedUnitCost = numTotal > 0 && numQty > 0 ? numTotal / numQty : 0

  function handleApply() {
    if (computedUnitCost <= 0) return
    const formatted = parseFloat(computedUnitCost.toFixed(2)).toString()
    onApply(formatted)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className="shrink-0 gap-1.5"
          />
        }
      >
        <Calculator className="size-4" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 gap-3 p-4">
        <PopoverHeader>
          <PopoverTitle>Bulk Cost Calculator</PopoverTitle>
          <PopoverDescription>Compute cost per piece from a bulk pack or box.</PopoverDescription>
        </PopoverHeader>

        <div className="flex flex-col gap-3">
          <Field>
            <FieldLabel htmlFor="bulkTotalCost">Total Bulk Price</FieldLabel>
            <Input
              id="bulkTotalCost"
              type="number"
              placeholder="e.g. 150"
              autoComplete="off"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="bulkQuantity">Total Quantity / Pieces</FieldLabel>
            <Input
              id="bulkQuantity"
              type="number"
              placeholder="e.g. 12"
              autoComplete="off"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Field>

          <div className="flex items-center justify-between rounded-md bg-muted/50 p-2.5 text-sm">
            <span className="text-muted-foreground text-xs">Cost per piece:</span>
            <span className="font-semibold text-foreground">
              {computedUnitCost > 0 ? pesoFormatter.format(computedUnitCost) : "₱0.00"}
            </span>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleApply}
            disabled={computedUnitCost <= 0}
            className="w-full"
          >
            Apply to Cost
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
