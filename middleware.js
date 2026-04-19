import {NextResponse} from "next/server";
import {jwtVerify} from "jose";
import createMiddleware from "next-intl/middleware";
import {routing} from "@src/i18n/routing";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req) {
  const {pathname} = req.nextUrl;
  const token = req.cookies.get("admin_token")?.value;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/login");

  // 🔐 AUTH
  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login?expired=true", req.url)
      );
    }

    try {
      await jwtVerify(token, secret);
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (isLoginRoute && token) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(
        new URL("/admin/dashboard", req.url)
      );
    } catch {
      // allow login
    }
  }

  if (isAdminRoute || isLoginRoute) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ]
};