import Image from "next/image"
import Link from "next/link"

import { shop } from "@/lib/shop"
import { whatsappUrl } from "@/lib/whatsapp"

const footerLinks = [
  { href: "/", label: "Catálogo" },
  { href: "/?categoria=skincare", label: "Skincare" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/carrito", label: "Tu bolsa" },
]

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-[#f6efe8]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={shop.logoUrl}
              alt={shop.fullName}
              width={56}
              height={56}
              className="size-14 rounded-full object-cover object-[center_38%] ring-1 ring-foreground/10"
            />
            <span className="font-heading text-2xl">
              {shop.name}
              <span className="text-lavender">{shop.suffix}</span>
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {shop.footerText}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Explorar</p>
          <ul className="mt-3 space-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Pedidos</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={whatsappUrl(`Hola, quiero información de ${shop.fullName}`)}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${shop.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                Instagram @{shop.instagram}
              </a>
            </li>
            <li>Zelle · Pago móvil · Transferencia</li>
            <li>Zoom, MRW o delivery local</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/80">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} {shop.fullName}. Catálogo de muestra para
          coordinar pedidos. Confirma disponibilidad al escribirnos.
        </p>
      </div>
    </footer>
  )
}
