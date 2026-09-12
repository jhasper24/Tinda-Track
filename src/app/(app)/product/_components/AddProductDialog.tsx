"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { pesoFormatter } from "@/lib/utils"
import { addProductAction } from "../_actions/product"
import { useProductForm } from "../_hooks/useProductForm"
import type { ProductOutput } from "../_schemas/product"
import { ProductFormField } from "./ProductFormField"

export function AddProductDialog() {
  const { form, isSubmitting, sellingPrice } = useProductForm({
    name: "",
    cost: "",
    markupValue: "",
    markupType: "percent",
  })

  async function onSubmit(data: ProductOutput) {
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
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <form id="addProductForm" onSubmit={form.handleSubmit(onSubmit)}>
          <ProductFormField form={form} isSubmitting={isSubmitting} />
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
