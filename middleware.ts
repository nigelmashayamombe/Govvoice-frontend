import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { UserRole } from "@/lib/auth"

// Helper to get user data from cookie
const getUserFromCookie = (request: NextRequest) => {
  const user = request.cookies.get("user")?.value
  try {
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

// Define route access by role
const roleAccess: Record<UserRole, string[]> = {
  admin: ["/dashboard", "/admin"],
  staff: ["/dashboard"],
  user: ["/citizen-portal"],
}

// Public routes that don't require authentication
const publicRoutes = ["/", "/register", "/home", "/about", "/policies", "/submit-feedback"]

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const userData = getUserFromCookie(request)

  // Allow public routes
  if (publicRoutes.includes(path)) {
    if (userData && path === "/") {
      // Redirect logged-in users to their appropriate dashboard
      const redirectPath = roleAccess[userData.role as UserRole]?.[0] || "/"
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
    return NextResponse.next()
  }

  // Check authentication for protected routes
  if (!userData) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Handle dashboard access
  if (path.startsWith("/dashboard")) {
    if (!["admin", "staff"].includes(userData.role)) {
      return NextResponse.redirect(new URL("/citizen-portal", request.url))
    }
  }

  // Handle citizen portal access
  if (path.startsWith("/citizen-portal")) {
    if (["admin", "staff"].includes(userData.role)) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

