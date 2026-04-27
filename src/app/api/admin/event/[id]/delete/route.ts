import { NextResponse } from 'next/server';
import { connectDB } from '@lib/mongodb';
import { Event } from '@src/models/Event';
import mongoose from 'mongoose'
import cloudinary from '@lib/cloudinary';
import { verifyAdmin } from '@lib/verifyAdmin';

interface Params {
  params: Promise<{ id: string }>
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const isAdmin = await verifyAdmin(req)
    if (!isAdmin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
    }

    await connectDB();

    const { id } = await params
    const { folder } = await req.json()

    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if (!isValidId) {
      return NextResponse.json({ message: 'ID not valid' }, { status: 404 })
    }
    
    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 })
    }

    if (event?.images && event?.images.length) {
      const publicIds = event.images.map(eI => folder + eI.publicId)

      await cloudinary.api.delete_resources(publicIds)
    }

    await Event.findByIdAndDelete(id)

    return NextResponse.json({ event });
    
  } catch (error: unknown) {
    console.error('Route Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: (error as Error).message },
      { status: 500 }
    );
  }
}