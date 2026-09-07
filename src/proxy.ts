import { NextResponse, type NextRequest } from "next/server"

import { ADMIN_COOKIE, readSessionToken } from "@/lib/auth-edge"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next()
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  const session = await readSessionToken(token)
  if (!session) {
    const response = NextResponse.redirect(new URL("/admin/login", request.url))
    response.cookies.delete(ADMIN_COOKIE)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
