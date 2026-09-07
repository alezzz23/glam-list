import { jwtVerify } from "jose"

import type { AdminSession } from "@/lib/types"

export const ADMIN_COOKIE = "bloom_admin_session"

function secretKey() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET debe tener al menos 16 caracteres")
  }
  return new TextEncoder().encode(secret)
}

export async function readSessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey())
    if (!payload.sub || typeof payload.email !== "string") return null
    return { id: payload.sub, email: payload.email }
  } catch {
    return null
  }
}
