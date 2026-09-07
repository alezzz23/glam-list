"use client";

import { Component, useEffect, useMemo, useState, type ReactNode } from "react";
import { RefreshCw, Search, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/product-card";
import { ProductDialog } from "@/components/product-dialog";
import { CATEGORY_LABELS, products, type Category, type Product } from "@/data/products";

type Filter = "todos" | Category;

const FILTER_TABS: { value: Filter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "maquillaje", label: CATEGORY_LABELS.maquillaje },
  { value: "skincare", label: CATEGORY_LABELS.skincare },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

class CatalogErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold">
            No pudimos cargar el catálogo
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Ocurrió un error inesperado al mostrar los productos. Intenta de
            nuevo y si el problema continúa, escríbenos por WhatsApp.
          </p>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => this.setState({ hasError: false })}
          >
            <RefreshCw className="size-4" />
            Reintentar
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-3xl border border-border/80 bg-card"
        >
          <Skeleton className="aspect-square w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-3/4" />
            <div className="flex items-center justify-between pt-1">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Catalog() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "maquillaje" || hash === "skincare") {
        setFilter(hash);
        document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const counts = useMemo(() => {
    return {
      todos: products.length,
      maquillaje: products.filter((p) => p.category === "maquillaje").length,
      skincare: products.filter((p) => p.category === "skincare").length,
    };
  }, []);

  const visible = useMemo(() => {
    const term = normalize(query.trim());
    return products.filter((product) => {
      const matchesFilter = filter === "todos" || product.category === filter;
      if (!matchesFilter) return false;
      if (!term) return true;
      return normalize(
        `${product.name} ${product.tagline} ${product.description}`
      ).includes(term);
    });
  }, [filter, query]);

  return (
    <section id="catalogo" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 sm:px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Nuestro catálogo
          </h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Fórmulas probadas y amadas por nuestra comunidad. Agrega al carrito
            y pide por WhatsApp.
          </p>
        </div>
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar labial, sérum, protector…"
            className="h-11 rounded-full bg-card pl-10"
            aria-label="Buscar productos"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setFilter(tab.value)}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === tab.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {tab.label}
            <span
              className={`ml-2 rounded-full px-1.5 text-xs ${
                filter === tab.value ? "bg-white/20" : "bg-secondary"
              }`}
            >
              {counts[tab.value]}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <CatalogErrorBoundary>
          {loading ? (
            <CatalogSkeleton />
          ) : visible.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-secondary">
                <SearchX className="size-7 text-secondary-foreground" />
              </span>
              <div>
                <p className="font-display text-xl font-semibold">
                  Sin resultados para “{query}”
                </p>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Revisa la ortografía o prueba con otra palabra, por ejemplo
                  “labial”, “sérum” o “hidratante”.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setQuery("");
                  setFilter("todos");
                }}
              >
                Limpiar búsqueda
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelected}
                />
              ))}
            </div>
          )}
        </CatalogErrorBoundary>
      </div>

      <ProductDialog product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
