"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"
import {
  FolderIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  PackageIcon,
  StoreIcon,
  TypeIcon,
} from "lucide-react"

import { logoutAction } from "@/app/admin/actions/auth"
import { Drawer } from "@/components/drawer"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboardIcon },
  { href: "/admin/productos", label: "Productos", icon: PackageIcon },
  { href: "/admin/categorias", label: "Categorías", icon: FolderIcon },
  { href: "/admin/tienda", label: "Tienda", icon: StoreIcon },
  { href: "/admin/contenido", label: "Páginas", icon: TypeIcon },
]

export function AdminShell({
  email,
  children,
}: {
  email: string
  children: ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-full bg-[#f7f1ea]">
      <div className="mx-auto flex min-h-dvh max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-border/70 bg-[#f3ebe3] p-5 md:block">
          <Nav email={email} pathname={pathname} />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border/70 px-4 py-3 md:px-8">
            <button
              type="button"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full md:hidden")}
              aria-label="Abrir menú"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </button>
            <p className="hidden text-sm text-muted-foreground md:block">Panel de Bloom Shop</p>
            <Link href="/" className="text-sm underline-offset-4 hover:underline">
              Ver tienda
            </Link>
          </header>
          <div className="flex-1 px-4 py-6 sm:px-8">{children}</div>
        </div>
      </div>
      <Drawer open={open} onOpenChange={setOpen} side="left">
        <div className="p-5">
          <Nav email={email} pathname={pathname} onNavigate={() => setOpen(false)} />
        </div>
      </Drawer>
    </div>
  )
}

function Nav({
  email,
  pathname,
  onNavigate,
}: {
  email: string
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      <p className="font-heading text-2xl">
        Bloom
        <span className="text-lavender"> Admin</span>
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{email}</p>
      <nav className="mt-8 flex flex-col gap-1">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm transition-colors",
                active ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              )}
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>
      <form action={logoutAction} className="mt-auto pt-8">
        <button
          type="submit"
          className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm hover:bg-secondary"
        >
          <LogOutIcon className="size-4" />
          Cerrar sesión
        </button>
      </form>
    </div>
  )
}
