import { connectDB } from '@lib/mongodb';
import { Event } from '@src/models/Event';
import mongoose from 'mongoose';
import { notFound } from 'next/navigation';
import EventView from './EventView';

interface PageProps {
  params: Promise<{ id: string }>;
}

const EventPage = async ({ params }: PageProps) => {
  const { id } = await params

  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) {
    return notFound(); 
  }

  await connectDB()
  const exists = await Event.exists({ _id: id })
  
  if (!exists) {
    return notFound()
  }

  return (
    <EventView id={id} />
  );
}

export default EventPage