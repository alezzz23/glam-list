import { Suspense } from "react"

import { CatalogView } from "@/components/catalog-view"
import { products } from "@/lib/products"

export const metadata = {
  title: "Catálogo",
  description:
    "Maquillaje y skincare de Bloom Shop.VE. Filtra por categoría, busca un producto y pide por WhatsApp.",
}

export default function CatalogoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.22em] text-lavender uppercase">
        Bloom Shop.VE
      </p>
      <h1 className="mt-2 font-heading text-4xl sm:text-5xl">Catálogo</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Dieciocho esenciales entre color y cuidado de la piel. Precios en dólares;
        el stock se confirma al escribirnos.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="h-40 animate-pulse rounded-2xl bg-muted/70" />
          }
        >
          <CatalogView products={products} />
        </Suspense>
      </div>
    </div>
  )
}
