import { NextResponse } from 'next/server';
import { connectDB } from '@lib/mongodb';
import { Event } from '@src/models/Event';
import mongoose from 'mongoose'
import { getCloudinaryPublicId } from '@lib/utils';
import cloudinary from '@lib/cloudinary';
import { verifyAdmin } from '@lib/verifyAdmin';

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const isAdmin = await verifyAdmin(req)
      if (!isAdmin) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
      }

    await connectDB();

    const { id } = await params
    const { url, folder } = await req.json()

    if (!url || !folder) {
      return NextResponse.json({ message: 'Necessary data is missing' }, { status: 404 })
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if (!isValidId) {
      return NextResponse.json({ message: 'ID not valid' }, { status: 404 })
    }
    
    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 })
    }

    const imageToDeleteId = getCloudinaryPublicId(event.coverImageUrl)
    event.coverImageUrl = url
    
    await Promise.all([
      cloudinary.uploader.destroy(folder + imageToDeleteId),
      event.save()
    ])

    return NextResponse.json({ updatedEvent: event });
    
  } catch (error: unknown) {
    console.error('Route Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: (error as Error).message },
      { status: 500 }
    );
  }
}