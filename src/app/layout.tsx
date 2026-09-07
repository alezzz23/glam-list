import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Outfit, Playfair_Display } from "next/font/google"

import { defaultShop } from "@/lib/site-defaults"

import "./globals.css"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: `${defaultShop.fullName} · Maquillaje y skincare`,
    template: `%s · ${defaultShop.fullName}`,
  },
  description: defaultShop.description,
  icons: {
    icon: defaultShop.logoUrl,
    apple: defaultShop.logoUrl,
  },
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
