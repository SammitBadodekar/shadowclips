import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const publicRoutes = ["/", "/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the session cookie from Better Auth
  // Better Auth uses 'better-auth.session_token' by default
  const sessionToken = request.cookies.get("better-auth.session_token");
  const isAuthenticated = !!sessionToken?.value;

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  // Check if the current route is the login page
  const isLoginRoute = pathname === "/login";
  const isHomeRoute = pathname === "/";

  // If user is authenticated and trying to access login page or home page
  if (isAuthenticated && (isLoginRoute || isHomeRoute)) {
    // Check if there's a redirect parameter
    const redirect = request.nextUrl.searchParams.get("redirect");
    if (redirect && redirect.startsWith("/")) {
      return NextResponse.redirect(new URL(redirect, request.url));
    }
    // Default redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not authenticated and trying to access a protected route
  // (All routes are protected by default except public routes)
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    // Add a redirect callback to return user after login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (handled separately with auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (public files)
     * - public files (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
