"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchIcon } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { categories, type CategoryId, type Product } from "@/lib/products"
import { cn } from "@/lib/utils"

const sorts = [
  { id: "featured", label: "Destacados" },
  { id: "price-asc", label: "Precio: menor" },
  { id: "price-desc", label: "Precio: mayor" },
  { id: "name", label: "Nombre" },
] as const

type SortId = (typeof sorts)[number]["id"]

export function CatalogBrowser({ products }: { products: Product[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoria = (searchParams.get("categoria") ?? "todos") as CategoryId | "todos"
  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const [sort, setSort] = useState<SortId>("featured")

  function setCategoria(next: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (next === "todos") params.delete("categoria")
    else params.set("categoria", next)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const list = products.filter((product) => {
      const matchesCategory = categoria === "todos" || product.category === categoria
      const matchesQuery =
        !needle ||
        product.name.toLowerCase().includes(needle) ||
        product.tagline.toLowerCase().includes(needle) ||
        product.ingredients.some((item) => item.toLowerCase().includes(needle))
      return matchesCategory && matchesQuery
    })

    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price
      if (sort === "price-desc") return b.price - a.price
      if (sort === "name") return a.name.localeCompare(b.name, "es")
      return Number(b.featured) - Number(a.featured) || Number(b.bestseller) - Number(a.bestseller)
    })
  }, [products, categoria, query, sort])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar sérum, labial, FPS…"
            className="h-11 rounded-full bg-card pr-4 pl-10"
            aria-label="Buscar productos"
            type="search"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {sorts.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSort(item.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                sort === item.id ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <FilterChip active={categoria === "todos"} onClick={() => setCategoria("todos")}>
          Todos
        </FilterChip>
        {categories.map((category) => (
          <FilterChip
            key={category.id}
            active={categoria === category.id}
            onClick={() => setCategoria(category.id)}
          >
            {category.name}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-card px-6 py-16 text-center ring-1 ring-foreground/8">
          <p className="font-heading text-2xl">No encontramos eso</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Prueba con “niacinamida”, “labial” o limpia la búsqueda. Si no está en
            el catálogo, escríbenos por WhatsApp y lo conseguimos.
          </p>
          <button
            type="button"
            className="mt-6 text-sm underline underline-offset-4"
            onClick={() => {
              setQuery("")
              setCategoria("todos")
            }}
          >
            Ver todo el catálogo
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-sm transition-colors",
        active ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-foreground/10 hover:bg-secondary"
      )}
    >
      {children}
    </button>
  )
}
