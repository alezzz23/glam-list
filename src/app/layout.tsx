import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Outfit, Playfair_Display } from "next/font/google"

import { getShop } from "@/lib/catalog"

import "./globals.css"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

export async function generateMetadata(): Promise<Metadata> {
  const shop = await getShop()
  return {
    title: {
      default: `${shop.fullName} · Maquillaje y skincare`,
      template: `%s · ${shop.fullName}`,
    },
    description: shop.description,
    icons: {
      icon: shop.logoUrl,
      apple: shop.logoUrl,
    },
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
