import { NextResponse } from "next/server";
import { connectDB } from "@src/lib/mongodb";
import { Event } from "@src/models/Event";
import mongoose from "mongoose"

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params
    const { data } = await req.json()

    if (!data) {
      return NextResponse.json({ message: "Necessary data is missing" }, { status: 404 })
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if (!isValidId) {
      return NextResponse.json({ message: "ID not valid" }, { status: 404 })
    }
    
    const event = await Event.findByIdAndUpdate(id, data, { new: true }).lean();
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ updatedEvent: event });
    
  } catch (error: unknown) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}