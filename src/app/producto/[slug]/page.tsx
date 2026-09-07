import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { AddToCart } from "@/components/add-to-cart"
import { ProductGrid } from "@/components/product-card"
import { ProductStage } from "@/components/product-visual"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/format"
import {
  getProduct,
  getRelatedProducts,
  products,
  subcategoryLabel,
} from "@/lib/products"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: "Producto" }
  return {
    title: product.name,
    description: product.tagline,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)
  const soldOut = product.stock === 0
  const lowStock = product.stock > 0 && product.stock <= 5

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm text-muted-foreground">
        <Link href="/catalogo" className="hover:underline">
          Catálogo
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/catalogo?categoria=${product.category}`}
          className="capitalize hover:underline"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="overflow-hidden rounded-3xl ring-1 ring-foreground/8">
          <ProductStage
            kind={product.visual}
            from={product.palette.from}
            to={product.palette.to}
            accent={product.palette.accent}
            className="aspect-square w-full sm:aspect-[4/5]"
          />
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-lavender uppercase">
            {subcategoryLabel(product.subcategory)} · {product.volume}
          </p>
          <h1 className="mt-2 font-heading text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{product.tagline}</p>
          <p className="mt-5 font-heading text-3xl">{formatPrice(product.price)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.isNew ? (
              <Badge className="bg-lavender text-espresso">Nuevo</Badge>
            ) : null}
            {soldOut ? (
              <Badge variant="secondary">Agotado</Badge>
            ) : lowStock ? (
              <Badge className="bg-blossom text-espresso">
                Quedan {product.stock} unidades
              </Badge>
            ) : (
              <Badge variant="outline">En stock</Badge>
            )}
          </div>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-8">
            <AddToCart product={product} />
          </div>
          <dl className="mt-10 space-y-6 border-t border-border pt-8">
            <div>
              <dt className="font-heading text-2xl">Cómo usarlo</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {product.howToUse}
              </dd>
            </div>
            <div>
              <dt className="font-heading text-2xl">Ingredientes clave</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {product.ingredients.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-heading text-3xl sm:text-4xl">También te puede gustar</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </div>
  )
}
