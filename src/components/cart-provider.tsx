"use client"

import * as React from "react"
import { toast } from "sonner"

import { type CartLine, lineKey } from "@/lib/cart"
import { getProductById } from "@/lib/products"

const STORAGE_KEY = "bloom-shop-cart"
const EMPTY: CartLine[] = []
const listeners = new Set<() => void>()
let current: CartLine[] = EMPTY

function emit() {
  listeners.forEach((listener) => listener())
}

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return EMPTY
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as CartLine[]
    if (!Array.isArray(parsed)) return EMPTY
    const next = parsed.filter((line) => line && typeof line.productId === "string")
    return next.length ? next : EMPTY
  } catch {
    return EMPTY
  }
}

function persist(next: CartLine[]) {
  current = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore quota / private mode
  }
  emit()
}

if (typeof window !== "undefined") {
  current = readStorage()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getClientSnapshot() {
  return current
}

function getServerSnapshot() {
  return EMPTY
}

type CartContextValue = {
  lines: CartLine[]
  ready: boolean
  addItem: (productId: string, quantity?: number, variantId?: string) => boolean
  setQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clear: () => void
  count: number
  subtotal: number
}

const CartContext = React.createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = React.useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

  const addItem = React.useCallback(
    (productId: string, quantity = 1, variantId?: string) => {
      const product = getProductById(productId)
      if (!product) return false
      if (product.stock <= 0) {
        toast.error("Este producto está agotado")
        return false
      }
      if (product.shades?.length && !variantId) {
        toast.error("Elige un tono para continuar")
        return false
      }

      const key = lineKey(productId, variantId)
      const existing = current.find((line) => line.key === key)
      const nextQty = (existing?.quantity ?? 0) + quantity
      if (nextQty > product.stock) {
        toast.error("No hay más unidades disponibles")
        return false
      }

      persist(
        existing
          ? current.map((line) => (line.key === key ? { ...line, quantity: nextQty } : line))
          : [...current, { key, productId, variantId, quantity }]
      )

      const shade = product.shades?.find((item) => item.id === variantId)
      toast.success(
        shade ? `${product.name} · ${shade.name} se agregó al carrito` : `${product.name} se agregó al carrito`
      )
      return true
    },
    []
  )

  const setQuantity = React.useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      persist(current.filter((line) => line.key !== key))
      return
    }
    persist(
      current.map((line) => {
        if (line.key !== key) return line
        const product = getProductById(line.productId)
        const max = product?.stock ?? quantity
        return { ...line, quantity: Math.min(quantity, max) }
      })
    )
  }, [])

  const removeItem = React.useCallback((key: string) => {
    persist(current.filter((line) => line.key !== key))
  }, [])

  const clear = React.useCallback(() => persist(EMPTY), [])

  const count = lines.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = lines.reduce((sum, line) => {
    const product = getProductById(line.productId)
    return sum + (product ? product.price * line.quantity : 0)
  }, 0)

  const value = React.useMemo(
    () => ({
      lines,
      ready: true,
      addItem,
      setQuantity,
      removeItem,
      clear,
      count,
      subtotal,
    }),
    [lines, addItem, setQuantity, removeItem, clear, count, subtotal]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
