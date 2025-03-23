import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userCookie = req.cookies.get("user");
  const url = req.nextUrl.clone();

  // If no user cookie exists, redirect to login
  if (!userCookie) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const parsedUser = JSON.parse(userCookie.value);

    // Check if user is admin
    if (parsedUser.role !== "admin") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // User is admin, allow access
    return NextResponse.next();
  } catch (error) {
    // If there's an error parsing the cookie, redirect to login
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin", // This ensures the middleware runs for the /admin route as well
  ],
};
