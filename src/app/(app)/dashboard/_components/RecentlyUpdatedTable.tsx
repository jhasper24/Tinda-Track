import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatLastUpdated } from "@/lib/utils"
import type { RecentlyUpdatedProduct } from "../_dal/product"

type RecentlyUpdatedTableProps = {
  products: RecentlyUpdatedProduct[]
}

export function RecentlyUpdatedTable({ products }: RecentlyUpdatedTableProps) {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-3/4">Product Name</TableHead>
          <TableHead className="text-right">Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="truncate">{product.name}</TableCell>
            <TableCell className="truncate text-right">
              {formatLastUpdated(product.updatedAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
