import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware executing for path:", req.nextUrl.pathname);

  // Get all cookies
  const cookies = req.cookies;
  console.log("All cookies:", cookies.getAll());

  const userCookie = req.cookies.get("user");
  console.log("User cookie:", userCookie?.value);

  const url = req.nextUrl.clone();

  // If no user cookie exists, redirect to login
  if (!userCookie) {
    console.log("No user cookie found, redirecting to login");
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const parsedUser = JSON.parse(userCookie.value);
    console.log("Parsed user:", parsedUser);

    // Validate user data
    if (!parsedUser._id || !parsedUser.role) {
      console.log("Invalid user data in cookie");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Check if user is admin
    if (parsedUser.role !== "admin") {
      console.log("User is not admin, redirecting to home");
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    console.log("User is admin, allowing access");
    return NextResponse.next();
  } catch (error) {
    console.log("Error parsing user cookie:", error);
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
