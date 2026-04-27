import { NextResponse } from 'next/server';
import { connectDB } from '@lib/mongodb';
import { Event } from '@src/models/Event';
import { verifyAdmin } from '@lib/verifyAdmin';

export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdmin(req)
    if (!isAdmin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
    }

    await connectDB();

    const { data } = await req.json();
    if (!data) {
      return NextResponse.json(
        { message: 'Missing event data' },
        { status: 400 }
      );
    }

    const newEvent = await Event.create(data);

    const res = NextResponse.json({ message: 'Success', event: newEvent }, { status: 201 });

    return res;
    
  } catch (error: unknown) {
    console.error('Route Error:', error);
    const res = NextResponse.json(
      { message: 'Internal Server Error', error: (error as Error).message },
      { status: 500 }
    );

    return res;
  }
}