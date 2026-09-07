import Image from "next/image"
import Link from "next/link"

import { store } from "@/lib/config"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-cream-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt=""
              width={1024}
              height={1024}
              className="size-14 rounded-full ring-1 ring-foreground/10"
            />
            <p className="font-heading text-2xl">
              Bloom Shop<span className="text-lavender">.VE</span>
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Emprendimiento venezolano de maquillaje y skincare. Pedidos por
            WhatsApp, envíos a Caracas y al interior.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-lavender uppercase">
            Explorar
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/catalogo" className="hover:underline">
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/catalogo?categoria=maquillaje" className="hover:underline">
                Maquillaje
              </Link>
            </li>
            <li>
              <Link href="/catalogo?categoria=skincare" className="hover:underline">
                Skincare
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className="hover:underline">
                Nosotros
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-lavender uppercase">
            Contacto
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>{store.city}</li>
            <li>{store.hours}</li>
            <li>{store.whatsappDisplay}</li>
            <li>@{store.instagram}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/80 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {store.name}. Hecho en Venezuela.
      </div>
    </footer>
  )
}
