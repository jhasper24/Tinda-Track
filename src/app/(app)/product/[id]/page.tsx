import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getSessionAndStore } from "@/dal/store"
import { pesoFormatter } from "@/lib/utils"
import { NoStoreState } from "../../_components/NoStoreState"
import { findProduct } from "../_dal/product"
import { getProductPricing } from "../_lib/utils"
import { EditProductDialog } from "./_components/EditProductDialog"

type ProductDetailPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { session, store } = await getSessionAndStore()
  if (session == null) return redirect("/signin")
  if (store == null) return <NoStoreState />

  const { id } = await params

  const product = await findProduct({ id, storeId: store.id }).catch(() => null)
  if (product == null) notFound()
  const { cost, markupLabel, sellingPrice } = getProductPricing(product)

  return (
    <div className="p-2">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="font-medium text-xl">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">Cost</p>
              <p className="font-medium text-lg">{pesoFormatter.format(cost)}</p>
            </div>
            <Separator orientation="vertical" />
            <div>
              <p className="text-muted-foreground">Selling Price</p>
              <p className="font-medium text-lg">{pesoFormatter.format(sellingPrice)}</p>
            </div>
            <Separator orientation="vertical" />
            <div>
              <p className="text-muted-foreground">Markup</p>
              <p className="font-medium text-lg">{markupLabel}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <EditProductDialog product={product} />
        </CardFooter>
      </Card>
    </div>
  )
}
