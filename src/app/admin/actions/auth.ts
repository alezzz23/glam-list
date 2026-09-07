"use server"

import { compare } from "bcryptjs"
import { redirect } from "next/navigation"

import { clearSessionCookie, getSession, setSessionCookie } from "@/lib/auth"
import { prisma } from "@/lib/db"

export type AuthState = { error?: string }

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    return { error: "Escribe correo y contraseña." }
  }

  if (!process.env.DATABASE_URL || !process.env.AUTH_SECRET) {
    return { error: "Faltan variables de entorno en producción (DATABASE_URL / AUTH_SECRET)." }
  }

  let session: { id: string; email: string }
  try {
    const user = await prisma.adminUser.findUnique({ where: { email } })
    if (!user || !(await compare(password, user.passwordHash))) {
      return { error: "Correo o contraseña incorrectos." }
    }
    session = { id: user.id, email: user.email }
    await setSessionCookie(session)
  } catch (error) {
    console.error("loginAction failed", error)
    return { error: "No se pudo iniciar sesión. Revisa la conexión a la base de datos." }
  }

  redirect("/admin")
}

export async function logoutAction() {
  await clearSessionCookie()
  redirect("/admin/login")
}

export async function loggedIn() {
  return Boolean(await getSession())
}
