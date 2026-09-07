export type CartLine = {
  key: string
  productId: string
  variantId?: string
  quantity: number
}

export function lineKey(productId: string, variantId?: string) {
  return variantId ? `${productId}:${variantId}` : productId
}
