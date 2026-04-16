import { IEvent } from '@src/models/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface EventCardProps {
  event: IEvent,
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link 
      className='flex flex-col w-1/3 shrink-0 items-center gap-2'
      href={"/admin/event/" + event?._id.toString()}
    >
      <Image
        src={event.coverImageUrl} 
        width={120}
        height={120}
        className='rounded-md'
        alt={event.title}
      />
      <span className='font-semibold'>{event.title}</span>
    </Link>
  )
}

export default EventCard