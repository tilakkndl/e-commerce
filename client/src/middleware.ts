import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("middleware executed!");
  const userCookie = req.cookies.get("user");
  const url = req.nextUrl.clone();

  if (userCookie) {
    const parsedUser = JSON.parse(userCookie.value);

    if (parsedUser.role !== "admin") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
