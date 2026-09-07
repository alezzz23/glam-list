import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Carrito",
}

export default function CarritoLayout({ children }: { children: ReactNode }) {
  return children
}
