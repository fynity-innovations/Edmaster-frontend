import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const MAINTENANCE_MODE = true // Set to false to disable maintenance mode

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next()

  const { pathname } = request.nextUrl

  // Allow the maintenance page itself and static assets
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL("/maintenance", request.url))
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
