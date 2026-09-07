import { Suspense } from "react"

import { CatalogBrowser } from "@/components/catalog-browser"
import { getCategories, getProducts } from "@/lib/catalog"

export default async function CatalogoPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Catálogo</p>
      <h1 className="mt-1 font-heading text-[1.75rem] leading-tight sm:mt-2 sm:text-5xl">Todo lo que hay ahora</h1>
      <p className="mt-2 hidden max-w-2xl text-muted-foreground sm:mt-3 sm:block">
        Precios en USD. El stock se actualiza a mano: si algo se agotó en el
        chat, te avisamos antes de cobrar.
      </p>
      <div className="mt-4 sm:mt-10">
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogBrowser products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  )
}

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="aspect-[3/4] animate-pulse rounded-2xl bg-secondary sm:h-96 sm:aspect-auto sm:rounded-3xl" />
      ))}
    </div>
  )
}
