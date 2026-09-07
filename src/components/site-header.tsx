"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart-sheet";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/catalogo?departamento=maquillaje", label: "Maquillaje" },
  { href: "/catalogo?departamento=skincare", label: "Skincare" },
  { href: "/nosotros", label: "Nosotros" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, hydrated } = useCart();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/8 bg-[#FBF7F2]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú" />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#FBF7F2]">
            <SheetHeader>
              <SheetTitle className="font-heading">Bloom Shop.VE</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base hover:bg-[#F3E6EA]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="Bloom Shop.VE"
            width={160}
            height={160}
            className="h-12 w-12 rounded-full object-cover ring-1 ring-foreground/10 sm:h-14 sm:w-14"
            priority
          />
          <span className="font-heading text-lg leading-none tracking-tight sm:text-xl">
            Bloom Shop
            <span className="text-[#A78BA5]">.VE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const path = link.href.split("?")[0];
            const isCurrent =
              link.href === "/"
                ? pathname === "/"
                : link.href === "/catalogo"
                  ? pathname.startsWith("/catalogo")
                  : pathname === path && !link.href.includes("?");
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-[#A78BA5]",
                  isCurrent ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Abrir pedido"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingBagIcon />
          {hydrated && itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[#A78BA5] text-[10px] font-medium text-white">
              {itemCount}
            </span>
          )}
        </Button>
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    </header>
  );
}
