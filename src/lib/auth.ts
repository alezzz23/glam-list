import "server-only"

import { cache } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignJWT } from "jose"

import { ADMIN_COOKIE, readSessionToken } from "@/lib/auth-edge"
import type { AdminSession } from "@/lib/types"

const WEEK = 60 * 60 * 24 * 7

function secretKey() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET debe tener al menos 16 caracteres")
  }
  return new TextEncoder().encode(secret)
}

export async function signSession(session: AdminSession) {
  return new SignJWT({ email: session.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey())
}

export { readSessionToken }

export async function setSessionCookie(session: AdminSession) {
  const token = await signSession(session)
  const jar = await cookies()
  jar.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK,
  })
}

export async function clearSessionCookie() {
  const jar = await cookies()
  jar.delete(ADMIN_COOKIE)
}

export const getSession = cache(async (): Promise<AdminSession | null> => {
  const jar = await cookies()
  const token = jar.get(ADMIN_COOKIE)?.value
  if (!token) return null
  return readSessionToken(token)
})

export async function requireAdmin() {
  const session = await getSession()
  if (!session) redirect("/admin/login")
  return session
}

export { ADMIN_COOKIE }
