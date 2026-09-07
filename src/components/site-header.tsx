"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, SearchIcon } from "lucide-react"

import { CartSheet } from "@/components/cart-sheet"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { store } from "@/lib/config"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/catalogo?categoria=maquillaje", label: "Maquillaje" },
  { href: "/catalogo?categoria=skincare", label: "Skincare" },
  { href: "/nosotros", label: "Nosotros" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="bg-espresso text-center text-[0.7rem] tracking-[0.22em] text-cream uppercase">
        Envíos a toda Venezuela · Precios en USD
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.5rem] sm:px-6">
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Abrir menú"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-background">
            <SheetHeader>
              <SheetTitle className="font-heading text-2xl">Menú</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="rounded-lg px-2 py-2.5 text-base text-espresso hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.jpg"
            alt={store.name}
            width={1024}
            height={1024}
            className="size-11 rounded-full ring-1 ring-foreground/10 sm:size-12"
            priority
          />
          <span className="font-heading text-xl leading-none tracking-tight sm:text-[1.35rem]">
            Bloom Shop
            <span className="text-lavender">.VE</span>
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const path = link.href.split("?")[0]
            const active =
              path === "/"
                ? pathname === "/"
                : path === "/catalogo"
                  ? pathname.startsWith("/catalogo") &&
                    link.label === "Catálogo"
                  : pathname === path
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm text-espresso/80 transition hover:bg-muted hover:text-espresso",
                  active && "bg-muted text-espresso"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            render={<Link href="/catalogo" aria-label="Buscar en el catálogo" />}
          >
            <SearchIcon />
          </Button>
          <CartSheet />
        </div>
      </div>
    </header>
  )
}
