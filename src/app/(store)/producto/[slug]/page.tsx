import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ProductCard } from "@/components/product-card"
import { ProductPurchase } from "@/components/product-purchase"
import { Badge } from "@/components/ui/badge"
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog"
import { formatPrice } from "@/lib/format"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Producto" }
  return {
    title: product.name,
    description: product.tagline,
  }
}

export default async function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product)
  const soldOut = product.stock <= 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Catálogo
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-foreground/10 sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {product.isNew ? <Badge className="bg-lavender text-foreground">Nuevo</Badge> : null}
            {product.bestseller ? <Badge>Favorito</Badge> : null}
            {soldOut ? <Badge variant="secondary">Agotado</Badge> : null}
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {product.size}
            </p>
            <h1 className="mt-2 font-heading text-4xl text-balance">{product.name}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>
          </div>
          <div className="flex items-baseline gap-3">
            <p className="font-heading text-3xl">{formatPrice(product.price)}</p>
            {product.compareAtPrice ? (
              <p className="text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            ) : null}
          </div>
          <p className="leading-relaxed text-muted-foreground">{product.description}</p>
          <ProductPurchase product={product} />
          <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-medium">Cómo se usa</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {product.howToUse}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium">Qué lleva</h2>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {product.ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-heading text-3xl">También en esta línea</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
