"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import {
  CATEGORY_LABELS,
  makeupCategories,
  products,
  skincareCategories,
  type Category,
  type Department,
} from "@/lib/products";
import { cn } from "@/lib/utils";

const sorts = [
  { id: "featured", label: "Destacados" },
  { id: "price-asc", label: "Precio: menor" },
  { id: "price-desc", label: "Precio: mayor" },
  { id: "name", label: "Nombre" },
] as const;

export function CatalogBrowser() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const department = (searchParams.get("departamento") as Department | null) ?? "all";
  const category = (searchParams.get("categoria") as Category | null) ?? "all";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("featured");

  function setFilter(key: string, value: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    if (key === "departamento") next.delete("categoria");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = products.filter((product) => {
      if (department !== "all" && product.department !== department) return false;
      if (category !== "all" && product.category !== category) return false;
      if (!needle) return true;
      return (
        product.name.toLowerCase().includes(needle) ||
        product.tagline.toLowerCase().includes(needle) ||
        CATEGORY_LABELS[product.category].toLowerCase().includes(needle)
      );
    });

    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name, "es");
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [department, category, query, sort]);

  const subcategories =
    department === "maquillaje"
      ? makeupCategories()
      : department === "skincare"
        ? skincareCategories()
        : [...makeupCategories(), ...skincareCategories()];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar labial, serum, SPF…"
            className="h-10 bg-background pl-8"
            aria-label="Buscar productos"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sorts.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSort(option.id)}
              className={cn(
                "rounded-full px-3 py-1 text-xs tracking-wide",
                sort === option.id
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground ring-1 ring-foreground/10",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Chip
          active={department === "all"}
          onClick={() => setFilter("departamento", "all")}
        >
          Todo
        </Chip>
        <Chip
          active={department === "maquillaje"}
          onClick={() => setFilter("departamento", "maquillaje")}
        >
          Maquillaje
        </Chip>
        <Chip
          active={department === "skincare"}
          onClick={() => setFilter("departamento", "skincare")}
        >
          Skincare
        </Chip>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Chip active={category === "all"} onClick={() => setFilter("categoria", "all")} subtle>
          Todas las categorías
        </Chip>
        {subcategories.map((item) => (
          <Chip
            key={item}
            active={category === item}
            onClick={() => setFilter("categoria", item)}
            subtle
          >
            {CATEGORY_LABELS[item]}
          </Chip>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-foreground/15 px-6 py-16 text-center">
          <p className="font-heading text-2xl">No encontramos eso</p>
          <p className="mt-2 text-muted-foreground">
            Prueba con otra palabra o limpia los filtros.
          </p>
          <button
            type="button"
            className="mt-4 text-sm text-[#A78BA5] underline-offset-4 hover:underline"
            onClick={() => {
              setQuery("");
              router.replace("/catalogo");
            }}
          >
            Ver todo el catálogo
          </button>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-muted-foreground">
            {visible.length} {visible.length === 1 ? "producto" : "productos"}
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  subtle,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "bg-foreground text-background"
          : subtle
            ? "bg-transparent text-muted-foreground ring-1 ring-foreground/12 hover:ring-foreground/30"
            : "bg-[#F3E6EA] text-foreground hover:bg-[#E8D4DA]",
      )}
    >
      {children}
    </button>
  );
}
