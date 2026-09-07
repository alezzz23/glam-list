"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBagIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
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
        "group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(45,41,38,0.45)] sm:rounded-3xl",
        className
      )}
    >
      <Link href={`/producto/${product.slug}`} className="relative block aspect-square overflow-hidden sm:aspect-[4/5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 sm:top-3 sm:left-3 sm:gap-1.5">
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
      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="flex-1 space-y-0.5 sm:space-y-1">
          <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:text-[11px] sm:tracking-[0.18em]">
            {product.size}
          </p>
          <Link
            href={`/producto/${product.slug}`}
            className="font-heading line-clamp-2 text-[15px] leading-snug sm:text-lg"
          >
            {product.name}
          </Link>
          <p className="hidden text-sm text-muted-foreground sm:block">{product.tagline}</p>
        </div>
        <div className="flex items-center justify-between gap-2 sm:items-end sm:gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium sm:text-base">{formatPrice(product.price)}</p>
            {product.compareAtPrice ? (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            ) : null}
          </div>
          {soldOut ? (
            <Link
              href={`/producto/${product.slug}`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 rounded-full px-2.5 sm:h-8")}
            >
              Avisarme
            </Link>
          ) : product.shades?.length ? (
            <Link
              href={`/producto/${product.slug}`}
              className={cn(buttonVariants({ size: "sm" }), "h-9 rounded-full px-2.5 sm:h-8")}
            >
              <span className="sm:hidden">Tono</span>
              <span className="hidden sm:inline">Elegir tono</span>
            </Link>
          ) : (
            <button
              type="button"
              className={cn(buttonVariants(), "size-9 rounded-full p-0 sm:h-10 sm:w-auto sm:px-3")}
              onClick={() => addItem(product.id)}
              aria-label={`Agregar ${product.name} al carrito`}
            >
              <ShoppingBagIcon className="size-4" />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
