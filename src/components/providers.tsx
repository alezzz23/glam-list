"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "next-themes"

import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/lib/cart"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
    >
      <CartProvider>
        {children}
        <Toaster position="top-center" theme="light" />
      </CartProvider>
    </ThemeProvider>
  )
}
