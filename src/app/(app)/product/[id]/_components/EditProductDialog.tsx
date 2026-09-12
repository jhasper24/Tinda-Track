"use client"

import { useEffect, useState } from "react"
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
import { updateProductAction } from "../../_actions/product"
import { ProductFormField } from "../../_components/ProductFormField"
import { useProductForm } from "../../_hooks/useProductForm"
import type { Product, ProductOutput } from "../../_schemas/product"

type EditProductProps = {
  product: Product
}

export function EditProductDialog({ product }: EditProductProps) {
  const [open, setOpen] = useState(false)
  const { form, isSubmitting, sellingPrice } = useProductForm({
    name: product.name,
    cost: product.cost,
    markupType: product.markupType,
    markupValue: product.markupValue,
  })
  async function onSubmit(data: ProductOutput) {
    const result = await updateProductAction(product.id, data)
    if (result.success) {
      toast.add({ type: "success", description: "Product updated successfully.", priority: "high" })
      setOpen(false)
    } else {
      toast.add({ type: "error", description: result.error, priority: "high" })
    }
  }

  useEffect(() => {
    if (open) {
      form.reset({
        name: product.name,
        cost: product.cost,
        markupType: product.markupType,
        markupValue: product.markupValue,
      })
    }
  }, [open, product, form])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-auto px-4" render={<Button />}>
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form id="editProductForm" onSubmit={form.handleSubmit(onSubmit)}>
          <ProductFormField form={form} isSubmitting={isSubmitting} />
        </form>
        <div className="flex flex-col rounded-md border border-border p-5">
          <span className="text-muted-foreground text-xs">Selling Price</span>
          <span className="text-xl">{pesoFormatter.format(sellingPrice)}</span>
        </div>
        <DialogFooter>
          <Button disabled={isSubmitting} type="submit" form="editProductForm">
            {isSubmitting ? <Spinner /> : "Update Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
