import { IEvent } from '@src/models/interfaces'
import Image from 'next/image'
import React from 'react'

const EventCard = ({ event }: { event: IEvent }) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='nohemi text-white text-4xl'>{event.title}</h1>

      <Image 
        src={event.coverImageUrl}
        alt={event.title}
        width={300}
        height={300}
        className='w-4/5 aspect-square rounded-sm'
      />
    </div>
  )
}

export default EventCard