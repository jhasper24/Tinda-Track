"use client"

import { Trash } from "lucide-react"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { deleteProductAction } from "@/server/actions/product"

type DeleteProductButtonProps = {
  id: string
  name: string
}

export function DeleteProductButton({ id, name }: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteProductAction(id)

      if (result.success) {
        toast.add({
          type: "success",
          description: "Product deleted successfully.",
          priority: "high",
        })
      } else {
        toast.add({
          type: "error",
          description: result.error,
          priority: "high",
        })
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" aria-label="Delete product" />}>
        <Trash className="size-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete "{name}"?</DialogTitle>
          <DialogDescription>
            This will permanently delete this product. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? <Spinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
