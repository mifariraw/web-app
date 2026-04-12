import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { toast } from "sonner";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
interface JWTPayload {
  userId: string;
  iat: number;
  exp: number;
}

export default async function proxy(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
  
      try {
        const { payload } = await jwtVerify<JWTPayload>(token, secret);
  
        if (payload.exp * 1000 < Date.now()) {
          toast.info("Sesiunea ta a expirat");
  
          return NextResponse.redirect(new URL("/login", req.url));
        }
  
        if (payload.userId && pathname === "/login") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        console.log(payload)
        
        return NextResponse.next();
        
      } catch (error) {
        console.error("JWT Verification failed:", error);
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

  return NextResponse.next();
}