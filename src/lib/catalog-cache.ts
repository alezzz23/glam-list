import { hydrateShop } from "@/lib/shop"
import type { Category, Product, Shop } from "@/lib/types"
import { defaultShop } from "@/lib/site-defaults"

let cachedProducts: Product[] = []
let cachedCategories: Category[] = []
let cachedShop: Shop = { ...defaultShop }

export function setCatalog(next: { products: Product[]; categories: Category[]; shop: Shop }) {
  cachedProducts = next.products
  cachedCategories = next.categories
  cachedShop = next.shop
  hydrateShop(next.shop)
}

export function getCachedProducts() {
  return cachedProducts
}

export function getCachedCategories() {
  return cachedCategories
}

export function getCachedShop() {
  return cachedShop
}

export function getProductById(id: string) {
  return cachedProducts.find((product) => product.id === id)
}

export function getProductBySlugFromCache(slug: string) {
  return cachedProducts.find((product) => product.slug === slug)
}
