import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import createMiddleware from 'next-intl/middleware';
import { routing } from '@src/i18n/routing';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);


// export default async function middleware(req) {
//   const token = req.cookies.get("admin_token")?.value;
//   const { pathname } = req.nextUrl;
  
//   if (pathname.startsWith("/admin") && !token) {
//     return NextResponse.redirect(new URL("/login?expired=true", req.url));
//   }

//   if (token) {
//     try {
//       const { payload } = await jwtVerify(token, secret);

//       if (pathname === "/login") {
//         return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//       }

//       return NextResponse.next();
//     } catch (error) {
//       console.error("JWT Verification failed:", error);
      
//       if (pathname !== "/login") {
//         return NextResponse.redirect(new URL("/login", req.url));
//       }
//     }
//   }

//   return NextResponse.next();
// }

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};