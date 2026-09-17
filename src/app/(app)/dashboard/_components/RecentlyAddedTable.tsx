import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatLastUpdated } from "@/lib/utils"
import type { RecentlyAddedProduct } from "../_dal/product"

type RecentlyAddedTableProps = { products: RecentlyAddedProduct[] }

export function RecentlyAddedTable({ products }: RecentlyAddedTableProps) {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-3/4">Product Name</TableHead>
          <TableHead className="text-right">Date Added</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="truncate">{product.name}</TableCell>
            <TableCell className="truncate text-right">
              {formatLastUpdated(product.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
