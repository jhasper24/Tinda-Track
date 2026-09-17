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
import type { Product } from "@/drizzle/schema"
import { formatLastUpdated, pesoFormatter } from "@/lib/utils"
import { getProductPricing } from "../_lib/utils"
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
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-auto">Product Name</TableHead>
          <TableHead className="w-32 text-right">Cost</TableHead>
          <TableHead className="w-32 text-right">Selling Price</TableHead>
          <TableHead className="w-24 text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          const { cost, markupLabel, sellingPrice } = getProductPricing(product)
          return (
            <TableRow key={product.id}>
              <TableCell>
                <p className="truncate font-medium">{product.name}</p>
                <p
                  className="text-muted-foreground text-xs"
                  title={product.updatedAt.toLocaleString()}
                >
                  Updated {formatLastUpdated(product.updatedAt)}
                </p>
              </TableCell>
              <TableCell>
                <div className="text-right">{pesoFormatter.format(cost)}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col items-end">
                  <span>{pesoFormatter.format(sellingPrice)}</span>
                  <span className="text-muted-foreground text-xs">{markupLabel}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Link
                    href={`/product/${product.id}`}
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <DeleteProductButton id={product.id} name={product.name} />
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
