"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBagIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/format"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

export function ProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  const { addItem } = useCart()
  const soldOut = product.stock <= 0
  const low = product.stock > 0 && product.stock <= 4

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(45,41,38,0.45)]",
        className
      )}
    >
      <Link href={`/producto/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.isNew ? (
            <Badge className="bg-lavender text-foreground">Nuevo</Badge>
          ) : null}
          {product.bestseller ? (
            <Badge className="bg-primary text-primary-foreground">Favorito</Badge>
          ) : null}
          {soldOut ? (
            <Badge variant="secondary">Agotado</Badge>
          ) : low ? (
            <Badge variant="secondary">Quedan {product.stock}</Badge>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1 space-y-1">
          <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            {product.size}
          </p>
          <Link href={`/producto/${product.slug}`} className="font-heading text-lg leading-snug">
            {product.name}
          </Link>
          <p className="text-sm text-muted-foreground">{product.tagline}</p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-base font-medium">{formatPrice(product.price)}</p>
            {product.compareAtPrice ? (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            ) : null}
          </div>
          {soldOut ? (
            <Button
              nativeButton={false}
              render={<Link href={`/producto/${product.slug}`} />}
              variant="outline"
              className="rounded-full"
            >
              Avisarme
            </Button>
          ) : product.shades?.length ? (
            <Button
              nativeButton={false}
              render={<Link href={`/producto/${product.slug}`} />}
              className="rounded-full"
            >
              Elegir tono
            </Button>
          ) : (
            <Button
              className="h-10 rounded-full px-3"
              onClick={() => addItem(product.id)}
              aria-label={`Agregar ${product.name} al carrito`}
            >
              <ShoppingBagIcon data-icon="inline-start" />
              Agregar
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
