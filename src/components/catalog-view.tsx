"use client"

import { useMemo, useState, type ReactNode } from "react"
import { SearchIcon, XIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { ProductGrid } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  categories,
  subcategories,
  type Category,
  type Product,
  type Subcategory,
} from "@/lib/products"
import { cn } from "@/lib/utils"

type SortKey = "featured" | "price-asc" | "price-desc" | "name"

const SORTS: SortKey[] = ["featured", "price-asc", "price-desc", "name"]

export function CatalogView({ products }: { products: Product[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const categoryParam = searchParams.get("categoria")
  const category: Category | "all" =
    categoryParam === "maquillaje" || categoryParam === "skincare"
      ? categoryParam
      : "all"

  const availableSubs = category === "all" ? [] : subcategories[category]
  const subParam = searchParams.get("sub")
  const subcategory: Subcategory | "all" = availableSubs.some(
    (item) => item.id === subParam
  )
    ? (subParam as Subcategory)
    : "all"

  const sortParam = searchParams.get("orden")
  const sort: SortKey = SORTS.includes(sortParam as SortKey)
    ? (sortParam as SortKey)
    : "featured"

  const [query, setQuery] = useState(searchParams.get("q") ?? "")

  function update(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (!value) params.delete(key)
      else params.set(key, value)
    }
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = products.filter((product) => {
      if (category !== "all" && product.category !== category) return false
      if (subcategory !== "all" && product.subcategory !== subcategory) {
        return false
      }
      if (!q) return true
      return (
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.ingredients.some((item) => item.toLowerCase().includes(q))
      )
    })

    const sorted = [...list]
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price)
    if (sort === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name, "es"))
    }
    if (sort === "featured") {
      sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          a.name.localeCompare(b.name, "es")
      )
    }
    return sorted
  }, [products, query, category, subcategory, sort])

  const hasFilters = query || category !== "all" || subcategory !== "all"

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="relative max-w-md flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busca sérum, labial, vitamina C…"
            className="h-11 rounded-full bg-card pr-10 pl-9"
            aria-label="Buscar productos"
          />
          {query ? (
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
            >
              <XIcon className="size-4" />
            </button>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filtered.length} producto{filtered.length === 1 ? "" : "s"}
          </span>
          <Select
            value={sort}
            onValueChange={(value) => {
              if (value) {
                update({ orden: value === "featured" ? null : String(value) })
              }
            }}
          >
            <SelectTrigger className="h-10 min-w-44 rounded-full bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destacados</SelectItem>
              <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
              <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
              <SelectItem value="name">Nombre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip
          active={category === "all"}
          onClick={() => update({ categoria: null, sub: null })}
        >
          Todo
        </FilterChip>
        {categories.map((item) => (
          <FilterChip
            key={item.id}
            active={category === item.id}
            onClick={() => update({ categoria: item.id, sub: null })}
          >
            {item.label}
          </FilterChip>
        ))}
      </div>

      {availableSubs.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip
            active={subcategory === "all"}
            onClick={() => update({ sub: null })}
            subtle
          >
            Toda la línea
          </FilterChip>
          {availableSubs.map((item) => (
            <FilterChip
              key={item.id}
              active={subcategory === item.id}
              onClick={() => update({ sub: item.id })}
              subtle
            >
              {item.label}
            </FilterChip>
          ))}
        </div>
      ) : null}

      {hasFilters ? (
        <Button
          variant="ghost"
          className="mt-3"
          onClick={() => {
            setQuery("")
            update({ categoria: null, sub: null, orden: null })
          }}
        >
          Limpiar filtros
        </Button>
      ) : null}

      <div className="mt-8">
        <ProductGrid
          products={filtered}
          emptyTitle="No encontramos coincidencias"
          emptyCopy="Prueba con otra palabra (labial, sérum, SPF) o limpia los filtros."
        />
      </div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
  subtle = false,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  subtle?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm transition",
        active
          ? "bg-espresso text-cream"
          : subtle
            ? "bg-transparent text-espresso ring-1 ring-border hover:bg-muted"
            : "bg-card text-espresso ring-1 ring-border hover:bg-muted"
      )}
    >
      {children}
    </button>
  )
}
