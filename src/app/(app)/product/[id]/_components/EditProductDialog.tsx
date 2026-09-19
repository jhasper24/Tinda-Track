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
import type { Product } from "@/drizzle/schema"
import { updateProductAction } from "../../_actions/product"
import { ProductFormField } from "../../_components/ProductFormField"
import { useProductForm } from "../../_hooks/useProductForm"
import type { ProductOutput } from "../../_schemas/product"

type EditProductProps = {
  product: Product
}

export function EditProductDialog({ product }: EditProductProps) {
  const [open, setOpen] = useState(false)
  const { form, isSubmitting, sellingPrice, sellingPriceError, handleSellingPriceChange } =
    useProductForm({
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
          <ProductFormField
            form={form}
            isSubmitting={isSubmitting}
            sellingPrice={sellingPrice}
            sellingPriceError={sellingPriceError}
            onSellingPriceChange={handleSellingPriceChange}
          />
        </form>
        <DialogFooter>
          <Button disabled={isSubmitting} type="submit" form="editProductForm">
            {isSubmitting ? <Spinner /> : "Update Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
