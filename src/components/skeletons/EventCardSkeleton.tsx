import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { cn } from '@src/lib/utils'

const EventCardSkeleton = () => {
  return (
    <div className='flex flex-col w-fit items-center gap-4'>
      <Skeleton className={cn(
        'w-30 aspect-square',
        "sm:w-40",
        "xl:w-60"
      )} />
      <Skeleton className={cn(
        'w-20 h-4',
        "sm:w-30 sm:h-6",
        "xl:w-50 xl:h-8"
      )} />
    </div>
  )
}

export default EventCardSkeleton