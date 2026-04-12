import { NextResponse } from "next/server";

export async function POST() {
  try {
    

    const res = NextResponse.json({ message: "Success" }, { status: 200 });

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