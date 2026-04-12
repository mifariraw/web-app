import { NextResponse } from "next/server";
import { connectDB } from "@src/lib/mongodb";
import { Event } from "@src/models/Event";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { data } = await req.json();
    if (!data) {
      return NextResponse.json(
        { message: "Missing event data" },
        { status: 400 }
      );
    }

    const newEvent = await Event.create(data);

    const res = NextResponse.json({ message: "Success", event: newEvent }, { status: 201 });

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