import type { Metadata } from "next"
import { Cormorant_Garamond, Figtree } from "next/font/google"

import { Providers } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

import "./globals.css"

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
})

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
})

export const metadata: Metadata = {
  title: {
    default: "Bloom Shop.VE — Maquillaje y skincare",
    template: "%s · Bloom Shop.VE",
  },
  description:
    "Catálogo de Bloom Shop.VE: maquillaje y skincare con pedidos por WhatsApp. Envíos a Caracas y toda Venezuela.",
  icons: { icon: "/logo.jpg" },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${heading.variable} ${sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  )
}
