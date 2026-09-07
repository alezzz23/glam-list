"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { toast } from "sonner"

import { getProduct, type Product } from "@/lib/products"

export type CartLine = {
  slug: string
  quantity: number
}

type CartContextValue = {
  lines: CartLine[]
  ready: boolean
  add: (slug: string, quantity?: number) => void
  setQuantity: (slug: string, quantity: number) => void
  remove: (slug: string) => void
  clear: () => void
  count: number
  items: { product: Product; quantity: number }[]
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "bloom-shop-cart"
const CHANGE_EVENT = "bloom-cart-change"

function parseLines(raw: string): CartLine[] {
  try {
    const parsed = JSON.parse(raw) as CartLine[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (line) =>
        typeof line.slug === "string" &&
        typeof line.quantity === "number" &&
        line.quantity > 0
    )
  } catch {
    return []
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) ?? "[]"
}

function getServerSnapshot() {
  return "[]"
}

function persist(next: CartLine[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

const emptySubscribe = () => () => {}

export function CartProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const ready = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const lines = useMemo(() => (ready ? parseLines(raw) : []), [raw, ready])

  const add = useCallback(
    (slug: string, quantity = 1) => {
      const product = getProduct(slug)
      if (!product || product.stock === 0) {
        toast.error("Este producto está agotado por ahora.")
        return
      }
      const existing = lines.find((line) => line.slug === slug)
      const nextQty = (existing?.quantity ?? 0) + quantity
      const capped = Math.min(nextQty, product.stock)
      persist(
        existing
          ? lines.map((line) =>
              line.slug === slug ? { ...line, quantity: capped } : line
            )
          : [...lines, { slug, quantity: capped }]
      )
      toast.success(`${product.name} se agregó al carrito.`)
    },
    [lines]
  )

  const setQuantity = useCallback(
    (slug: string, quantity: number) => {
      const product = getProduct(slug)
      if (!product) return
      const capped = Math.min(Math.max(quantity, 0), product.stock)
      persist(
        capped === 0
          ? lines.filter((line) => line.slug !== slug)
          : lines.map((line) =>
              line.slug === slug ? { ...line, quantity: capped } : line
            )
      )
    },
    [lines]
  )

  const remove = useCallback(
    (slug: string) => {
      persist(lines.filter((line) => line.slug !== slug))
    },
    [lines]
  )

  const clear = useCallback(() => persist([]), [])

  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = getProduct(line.slug)
          if (!product) return null
          return { product, quantity: line.quantity }
        })
        .filter((item): item is { product: Product; quantity: number } =>
          Boolean(item)
        ),
    [lines]
  )

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      lines,
      ready,
      add,
      setQuantity,
      remove,
      clear,
      count,
      items,
      subtotal,
    }),
    [lines, ready, add, setQuantity, remove, clear, count, items, subtotal]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
