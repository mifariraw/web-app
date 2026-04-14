import { NextResponse } from "next/server";
import { connectDB } from "@src/lib/mongodb";
import { Event } from "@src/models/Event";

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params
    
    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ events:  event && [event] || [] });
    
  } catch (error: unknown) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}