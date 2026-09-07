"use client"

import type { ReactNode } from "react"

import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster theme="light" position="top-center" />
    </CartProvider>
  )
}
