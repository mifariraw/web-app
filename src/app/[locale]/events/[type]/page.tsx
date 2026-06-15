import { notFound } from 'next/navigation';
import EventView from './EventView';

interface PageProps {
  params: Promise<{ type: string }>;
}

const EventPage = async ({ params }: PageProps) => {
  const acceptedTypes = ['concert', 'event', 'personal_projects', 'portraits']
  const { type } = await params

  if (!acceptedTypes.includes(type)) {
    return notFound()
  }

  return (
    <EventView type={type} />
  )
}

export default EventPage