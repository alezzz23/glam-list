"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { getProductById, type Shade } from "@/lib/products";

export type CartLine = {
  productId: string;
  shadeId?: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  hydrated: boolean;
  addItem: (productId: string, options?: { shadeId?: string; quantity?: number }) => void;
  setQuantity: (productId: string, shadeId: string | undefined, quantity: number) => void;
  removeItem: (productId: string, shadeId?: string) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
};

const STORAGE_KEY = "bloom-shop-cart";
const CartContext = createContext<CartContextValue | null>(null);
const listeners = new Set<() => void>();
let memory: CartLine[] | null = null;

function lineKey(productId: string, shadeId?: string) {
  return `${productId}::${shadeId ?? "_"}`;
}

function emit() {
  for (const listener of listeners) listener();
}

function readStorage(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getSnapshot() {
  if (memory === null) memory = readStorage();
  return memory;
}

function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

const EMPTY: CartLine[] = [];

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function write(next: CartLine[]) {
  memory = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = lines !== EMPTY;

  const addItem = useCallback(
    (productId: string, options?: { shadeId?: string; quantity?: number }) => {
      const quantity = options?.quantity ?? 1;
      const shadeId = options?.shadeId;
      const current = getSnapshot();
      const key = lineKey(productId, shadeId);
      const existing = current.find((line) => lineKey(line.productId, line.shadeId) === key);
      if (existing) {
        write(
          current.map((line) =>
            lineKey(line.productId, line.shadeId) === key
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          ),
        );
        return;
      }
      write([...current, { productId, shadeId, quantity }]);
    },
    [],
  );

  const setQuantity = useCallback(
    (productId: string, shadeId: string | undefined, quantity: number) => {
      const current = getSnapshot();
      const key = lineKey(productId, shadeId);
      if (quantity <= 0) {
        write(current.filter((line) => lineKey(line.productId, line.shadeId) !== key));
        return;
      }
      write(
        current.map((line) =>
          lineKey(line.productId, line.shadeId) === key ? { ...line, quantity } : line,
        ),
      );
    },
    [],
  );

  const removeItem = useCallback((productId: string, shadeId?: string) => {
    const key = lineKey(productId, shadeId);
    write(getSnapshot().filter((line) => lineKey(line.productId, line.shadeId) !== key));
  }, []);

  const clear = useCallback(() => write([]), []);

  const { itemCount, subtotal } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const line of lines) {
      const product = getProductById(line.productId);
      if (!product) continue;
      count += line.quantity;
      total += product.price * line.quantity;
    }
    return { itemCount: count, subtotal: total };
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      hydrated,
      addItem,
      setQuantity,
      removeItem,
      clear,
      itemCount,
      subtotal,
    }),
    [lines, hydrated, addItem, setQuantity, removeItem, clear, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

export function shadeForLine(productId: string, shadeId?: string): Shade | undefined {
  const product = getProductById(productId);
  if (!product || !shadeId) return undefined;
  return product.shades?.find((shade) => shade.id === shadeId);
}
