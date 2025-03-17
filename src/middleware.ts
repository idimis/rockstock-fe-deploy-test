import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "./lib/utils/auth";
import { decodeToken } from "./lib/utils/decodeToken";

export function middleware(req: NextRequest) {
  const accessToken = getAccessToken();
  const decoded = accessToken ? decodeToken(accessToken) : null;

  if (
    req.nextUrl.pathname.startsWith("/") ||
    req.nextUrl.pathname.startsWith("/products")
  ) {
    return NextResponse.next();
  }

  try {
    const userRole = decoded?.roles ?? "";

    const routePermissions: { [key: string]: string[] } = {
      "/dashboard/admin": ["Super Admin", "Warehouse Admin"],
      "/dashboard/user": ["Customer"]
    };

    for (const route in routePermissions) {
      if (req.nextUrl.pathname.startsWith(route) && !routePermissions[route].includes(userRole)) {
        return NextResponse.redirect(new URL("/error/401", req.url));
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/error/401", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
