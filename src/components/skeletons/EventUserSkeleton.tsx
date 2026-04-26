import React from 'react'
import { Skeleton } from '../ui/skeleton';
import { IconLibraryPhoto, IconLoader2 } from '@tabler/icons-react';
import { cn } from '@src/lib/utils';

const EventUserSkeleton = ({ galleryText }: { galleryText: string }) => {
  return (
    <div className='p-4 h-full relative'>
      <section className='w-full flex flex-col items-center justify-center gap-4'>
        <Skeleton className='w-1/2 h-4 opacity-0!' />
        <Skeleton className={cn(
          'w-1/2 h-8',
          "lg:w-55 lg:h-10",
          "xl:w-75",
          "2xl:w-90"
        )} />
        <Skeleton className={cn(
          'w-3/5 aspect-square',
          "lg:w-70",
          "xl:w-90",
          "2xl:w-105"
        )} />
      
        <div className='flex flex-col items-center w-full gap-1'>
          <Skeleton className='w-1/2 h-10 opacity-0!' />
          <Skeleton className={cn(
            'w-1/2 h-8',
            "lg:w-50",
            "xl:w-70",
            "2xl:w-85"
          )} />
          <Skeleton className={cn(
            'w-1/2 h-8',
            "lg:w-50",
            "xl:w-70",
            "2xl:w-85"
          )} />
        </div>
      </section>

      <section className='lg:px-8'>
        <div className="flex-center-between mt-16 mb-8 z-10 text-white">
          <h2 className="flex-center gap-2 whitespace-nowrap">
            <IconLibraryPhoto size={24} />
            <span className='text-2xl uppercase font-bold'>{galleryText}</span>
            <IconLoader2 size={20} className='rotate' />
          </h2>
        </div>

        <div>
          <div className='flex items-start gap-2 mb-2'>
            <Skeleton className={cn(
              'flex-1/2 h-30',
              'lg:h-50'
            )} />
            <Skeleton className={cn(
              'flex-1/2 h-30',
              'lg:h-50'
            )} />
          </div>
          <div className='flex items-start gap-2'>
            <Skeleton className={cn(
              'flex-1/3 h-20',
              'lg:h-40'
            )} />
            <Skeleton className={cn(
              'flex-1/3 h-20',
              'lg:h-40'
            )} />
            <Skeleton className={cn(
              'flex-1/3 h-20',
              'lg:h-40'
            )} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventUserSkeleton