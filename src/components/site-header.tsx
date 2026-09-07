"use client";

import { ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

const NAV_ITEMS = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#maquillaje", label: "Maquillaje" },
  { href: "#skincare", label: "Skincare" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteHeader() {
  const { count, setOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="size-4.5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Aura<span className="text-primary"> Beauty</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          variant="outline"
          className="relative rounded-full"
          onClick={() => setOpen(true)}
          aria-label={`Abrir carrito, ${count} productos`}
        >
          <ShoppingBag className="size-4" />
          <span className="hidden sm:inline">Carrito</span>
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
