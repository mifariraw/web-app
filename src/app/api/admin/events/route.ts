import { NextResponse } from 'next/server';
import { connectDB } from '@lib/mongodb';
import { Event } from '@src/models/Event';

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const search = searchParams.get('search') || '';

    const query: Record<string, unknown> = {};
    
    if (type) {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }
    
    const events = await Event.find(query).sort({ date: -1 });

    return NextResponse.json({ events: events || [] });
    
  } catch (error: unknown) {
    console.error('Route Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: (error as Error).message },
      { status: 500 }
    );
  }
}