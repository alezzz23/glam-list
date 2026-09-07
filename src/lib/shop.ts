import type { Shop } from "@/lib/types"
import { defaultShop } from "@/lib/site-defaults"

export type { Shop }

export const shop: Shop = { ...defaultShop }

export function hydrateShop(next: Shop) {
  Object.assign(shop, next)
}
