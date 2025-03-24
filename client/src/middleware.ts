import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Skip middleware for non-admin routes
  if (!url.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Get the token from the Authorization header
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Decode the JWT token (it's base64 encoded)
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check if user is admin
    if (payload.role !== "admin") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
