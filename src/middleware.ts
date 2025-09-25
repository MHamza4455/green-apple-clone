import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isExactAdminRoute = req.nextUrl.pathname === "/admin";

    // If accessing admin routes, check if user is authenticated and has admin role
    if (isAdminRoute) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }

      if (
        token.role !== UserRole.ADMIN &&
        token.role !== UserRole.SUPER_ADMIN
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // If accessing exact /admin route and user is authenticated admin, redirect to dashboard
      if (isExactAdminRoute && token && (token.role === UserRole.ADMIN || token.role === UserRole.SUPER_ADMIN)) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req }) => {
        const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

        // For admin routes, we'll handle authorization in the middleware function above
        if (isAdminRoute) {
          return true;
        }

        // For other routes, allow access
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/admin", "/auth/login"],
};
