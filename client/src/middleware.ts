import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Skip middleware for non-admin routes
  if (!url.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Get the user data from localStorage cookie
  const userData = req.cookies.get("userData")?.value;

  if (!userData) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  try {
    const user = JSON.parse(userData);

    // Check if user is admin
    if (user.role !== "admin") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [],
};
