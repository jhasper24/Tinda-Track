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
import { pesoFormatter } from "@/lib/utils"
import { getProductPricing } from "../_lib/utils"
import type { Product } from "../_schemas/product"
import { DeleteProductButton } from "./DeleteProductButton"

type ProductTableProps = {
  products: Product[]
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
          const { cost, markupLabel, sellingPrice } = getProductPricing(product)

          return (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{pesoFormatter.format(cost)}</TableCell>
              <TableCell>{markupLabel}</TableCell>
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
