"use client"

import type { ReactNode } from "react"

import { setCatalog } from "@/lib/catalog-cache"
import type { Category, Product, Shop } from "@/lib/types"

export function CatalogHydrator({
  shop,
  products,
  categories,
  children,
}: {
  shop: Shop
  products: Product[]
  categories: Category[]
  children: ReactNode
}) {
  setCatalog({ shop, products, categories })
  return children
}
