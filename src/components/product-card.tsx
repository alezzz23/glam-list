import Link from "next/link"

import { ProductStage } from "@/components/product-visual"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/format"
import { subcategoryLabel, type Product } from "@/lib/products"

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock === 0
  const lowStock = product.stock > 0 && product.stock <= 5

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8 transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-24px_rgba(47,39,35,0.35)]"
    >
      <div className="relative aspect-[4/5]">
        <ProductStage
          kind={product.visual}
          from={product.palette.from}
          to={product.palette.to}
          accent={product.palette.accent}
          className="h-full w-full"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.isNew ? (
            <Badge className="bg-lavender text-espresso">Nuevo</Badge>
          ) : null}
          {soldOut ? (
            <Badge variant="secondary">Agotado</Badge>
          ) : lowStock ? (
            <Badge className="bg-blossom text-espresso">Últimas unidades</Badge>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 px-4 pt-4 pb-5">
        <p className="text-[0.7rem] tracking-[0.18em] text-lavender uppercase">
          {subcategoryLabel(product.subcategory)}
        </p>
        <h3 className="font-heading text-xl leading-tight text-espresso group-hover:text-espresso/80">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.tagline}
        </p>
        <p className="mt-auto pt-3 font-medium text-espresso">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}

export function ProductGrid({
  products,
  emptyTitle = "No hay productos en esta vista",
  emptyCopy = "Prueba otra categoría o limpia la búsqueda.",
}: {
  products: Product[]
  emptyTitle?: string
  emptyCopy?: string
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
        <p className="font-heading text-2xl text-espresso">{emptyTitle}</p>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">{emptyCopy}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  )
}
