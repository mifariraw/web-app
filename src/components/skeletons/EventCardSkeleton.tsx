import React from 'react'
import { Skeleton } from '../ui/skeleton'

const EventCardSkeleton = () => {
  return (
    <div className='flex flex-col flex-1/3 items-center gap-4'>
      <Skeleton className='w-30 aspect-square' />
      <Skeleton className='w-20 h-4' />
    </div>
  )
}

export default EventCardSkeleton