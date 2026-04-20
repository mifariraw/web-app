import { verifyAdmin } from "@src/lib/verifyAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(req)
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const res = NextResponse.json({ message: "Success" }, { status: 200 });

    res.cookies.set("admin_token", "", { path: "/", expires: new Date(0) });

    return res;
    
  } catch (error: unknown) {
    console.error("Route Error:", error);
    const res = NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
    
    return res;
  }
}