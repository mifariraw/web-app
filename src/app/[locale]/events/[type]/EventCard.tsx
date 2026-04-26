"use client"

import { cn } from '@src/lib/utils'
import { IEvent } from '@src/models/interfaces'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const EventCard = ({ event, isActive = true }: { event: IEvent, isActive?: boolean }) => {
  const locale = useLocale()

  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className={cn(
        'nohemi text-white text-4xl whitespace-nowrap opacity-0 transition-opacity duration-300 ease-linear',
        isActive && "opacity-100"
      )}>
        {locale === "ro" ? event.title : event.titleTranslation}
      </h1>

      <Image 
        src={event.coverImageUrl}
        alt={locale === "ro" 
          ? event.title 
          : event.titleTranslation
        }
        width={300}
        height={300}
        className={cn(
          'w-4/5 aspect-square rounded-sm',
          ""
        )}
      />
    </div>
  )
}

export default EventCard