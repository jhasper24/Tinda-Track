import { Pencil } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { parseNumber, pesoFormatter } from "@/lib/utils"
import type { findProductByStoreId } from "../_dal/product"
import { DeleteProductButton } from "./DeleteProductButton"

type ProductTableProps = {
  products: Awaited<ReturnType<typeof findProductByStoreId>>
}

export function ProductTable({ products }: ProductTableProps) {
  return products.length === 0 ? (
    <div className="flex h-full w-full flex-col items-center justify-center py-12">
      <div className="font-medium text-muted-foreground">No products yet.</div>
    </div>
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product name</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Markup</TableHead>
          <TableHead>Selling Price</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          const cost = parseNumber(product.cost)
          const markupValue = parseNumber(product.markupValue)
          const sellingPrice =
            product.markupType === "percent" ? cost * (1 + markupValue / 100) : cost + markupValue
          const markup =
            product.markupType === "percent"
              ? `${product.markupValue}%`
              : pesoFormatter.format(markupValue)

          return (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{pesoFormatter.format(cost)}</TableCell>
              <TableCell>{markup}</TableCell>
              <TableCell>{pesoFormatter.format(sellingPrice)}</TableCell>
              <TableCell className="flex">
                <Link
                  href={`/product/${product.id}`}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  <Pencil className="size-4" />
                </Link>
                <DeleteProductButton id={product.id} name={product.name} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
