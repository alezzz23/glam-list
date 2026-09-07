"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { MenuIcon, ShoppingBagIcon } from "lucide-react"

import { CartSheet } from "@/components/cart-sheet"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { shop } from "@/lib/shop"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/catalogo?categoria=skincare", label: "Skincare" },
  { href: "/catalogo?categoria=rostro", label: "Maquillaje" },
  { href: "/carrito", label: "Carrito" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
                aria-label="Abrir menú"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(100%,20rem)] bg-background">
            <SheetHeader>
              <SheetTitle className="font-heading text-2xl">
                {shop.name}
                <span className="text-lavender">{shop.suffix}</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-base hover:bg-secondary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Image
            src="/logo.jpg"
            alt=""
            width={48}
            height={48}
            className="size-11 rounded-full object-cover object-[center_38%] ring-1 ring-foreground/10 sm:size-12"
            priority
          />
          <span className="font-heading text-lg leading-none tracking-tight sm:text-xl">
            {shop.name}
            <span className="text-lavender">{shop.suffix}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-secondary",
                (link.href === "/" && pathname === "/") ||
                  (link.href === "/catalogo" && pathname.startsWith("/catalogo"))
                  ? "bg-secondary"
                  : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <CartSheet>
            <Button
              variant="outline"
              className="relative h-10 rounded-full px-3"
              aria-label={count ? `Abrir carrito, ${count} productos` : "Abrir carrito"}
            >
              <ShoppingBagIcon />
              <span className="hidden sm:inline">Bolsa</span>
              {count > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {count}
                </span>
              ) : null}
            </Button>
          </CartSheet>
        </div>
      </div>
    </header>
  )
}
