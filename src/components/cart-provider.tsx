"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";
import { WHATSAPP_NUMBER, products } from "@/data/products";
import { formatPrice } from "@/lib/format";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  checkoutUrl: string;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "aura-beauty-cart";
const EMPTY_ITEMS: CartItem[] = [];

let cartItems: CartItem[] = EMPTY_ITEMS;
let storeHydrated = false;
const listeners = new Set<() => void>();

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is CartItem =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as CartItem).productId === "string" &&
          typeof (item as CartItem).quantity === "number" &&
          products.some((p) => p.id === (item as CartItem).productId)
      )
      .map((item) => ({
        ...item,
        quantity: Math.max(1, Math.min(99, Math.floor(item.quantity))),
      }));
  } catch {
    return [];
  }
}

function subscribe(listener: () => void): () => void {
  if (!storeHydrated && typeof window !== "undefined") {
    cartItems = readStoredCart();
    storeHydrated = true;
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): CartItem[] {
  return cartItems;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_ITEMS;
}

function setCart(next: CartItem[]) {
  cartItems = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Almacenamiento no disponible: el carrito funciona solo en memoria.
  }
  listeners.forEach((listener) => listener());
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setOpen] = useState(false);

  const add = useCallback((productId: string, quantity = 1) => {
    const existing = cartItems.find((item) => item.productId === productId);
    if (existing) {
      setCart(
        cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
            : item
        )
      );
    } else {
      setCart([...cartItems, { productId, quantity }]);
    }
  }, []);

  const remove = useCallback((productId: string) => {
    setCart(cartItems.filter((item) => item.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cartItems.filter((item) => item.productId !== productId));
      return;
    }
    setCart(
      cartItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(99, quantity) }
          : item
      )
    );
  }, []);

  const clear = useCallback(() => setCart([]), []);

  const detailed = useMemo(
    () =>
      items
        .map((item) => ({
          item,
          product: products.find((p) => p.id === item.productId) as Product,
        }))
        .filter((entry) => Boolean(entry.product)),
    [items]
  );

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      detailed.reduce(
        (total, { item, product }) => total + product.price * item.quantity,
        0
      ),
    [detailed]
  );

  const checkoutUrl = useMemo(() => {
    const lines = detailed.map(
      ({ item, product }) =>
        `• ${item.quantity} × ${product.name} — ${formatPrice(product.price * item.quantity)}`
    );
    const message = [
      "¡Hola Aura Beauty! Quiero hacer un pedido:",
      "",
      ...lines,
      "",
      `Total: ${formatPrice(subtotal)}`,
    ].join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [detailed, subtotal]);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      setOpen,
      add,
      remove,
      setQuantity,
      clear,
      checkoutUrl,
    }),
    [items, count, subtotal, isOpen, add, remove, setQuantity, clear, checkoutUrl]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return context;
}
