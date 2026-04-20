import { jwtVerify } from "jose";

export async function verifyAdmin(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie
    .split("; ")
    .find(c => c.startsWith("admin_token="))
    ?.split("=")[1];

  if (!token) throw new Error("Unauthorized");

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  return jwtVerify(token, secret);
}