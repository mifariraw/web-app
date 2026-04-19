import { notFound } from 'next/navigation';
import React from 'react'
import EventView from './EventView';

interface PageProps {
  params: Promise<{ type: string }>;
}

const EventPage = async ({ params }: PageProps) => {
  const acceptedTypes = ["concert", "event", "personal_project", "portraits"]
  const { type } = await params

  if (!acceptedTypes.includes(type)) {
    return notFound()
  }

  return (
    <EventView type={type} />
  )
}

export default EventPage