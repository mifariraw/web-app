import { NextResponse } from 'next/server';
import { connectDB } from '@lib/mongodb';
import { Event } from '@src/models/Event';

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params
    
    const event = await Event.findByIdAndUpdate(
      id, 
      { 
        $inc: { likes: 1 } 
      }
    );
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Ok' });
    
  } catch (error: unknown) {
    console.error('Route Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: (error as Error).message },
      { status: 500 }
    );
  }
}