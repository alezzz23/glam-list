import { Suspense } from "react"

import { CatalogBrowser } from "@/components/catalog-browser"
import { getCategories, getProducts, getShop } from "@/lib/catalog"

export async function generateMetadata() {
  const shop = await getShop()
  return {
    title: "Catálogo",
    description: `Maquillaje, skincare y kits de ${shop.fullName}. Filtra por categoría y pide por WhatsApp.`,
  }
}

export default async function CatalogoPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Catálogo</p>
      <h1 className="mt-2 font-heading text-4xl sm:text-5xl">Todo lo que hay ahora</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Precios en USD. El stock se actualiza a mano: si algo se agotó en el
        chat, te avisamos antes de cobrar.
      </p>
      <div className="mt-10">
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogBrowser products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  )
}

function CatalogSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-96 animate-pulse rounded-3xl bg-secondary" />
      ))}
    </div>
  )
}
