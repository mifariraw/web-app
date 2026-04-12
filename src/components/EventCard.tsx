import { IEvent } from '@src/models/interfaces'
import Image from 'next/image'
import React from 'react'

interface EventCardProps {
  event: IEvent,
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <Image
        src={event.coverImageUrl} 
        width={120}
        height={120}
        className='rounded-md'
        alt={event.title}
      />
      <span className='font-semibold'>{event.title}</span>
    </div>
  )
}

export default EventCard