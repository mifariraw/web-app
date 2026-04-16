import React from 'react'
import { Skeleton } from '../ui/skeleton';
import { IconLibraryPhoto, IconLoader2 } from '@tabler/icons-react';

const EventUserSkeleton = () => {
  return (
    <div className='p-4 h-full relative'>
      <section className='w-full flex flex-col items-center justify-center gap-4'>
        
        <Skeleton className='w-1/2 h-4 opacity-0!' />
        <Skeleton className='w-1/2 h-8' />
        <Skeleton className='w-3/5 aspect-square' />
      
        <div className='flex flex-col items-center w-full gap-1'>
          <Skeleton className='w-1/2 h-10 opacity-0!' />
          <Skeleton className='w-1/2 h-6' />
          <Skeleton className='w-1/2 h-6' />
        </div>
      </section>

      <section>
        <div className="flex-center-between mt-16 mb-8 z-10 text-white">
          <h2 className="flex-center gap-2 whitespace-nowrap">
            <IconLibraryPhoto size={24} />
            <span className='text-2xl uppercase font-bold'>Galerie</span>
            <IconLoader2 size={20} className='rotate' />
          </h2>
        </div>

        <div>
          <div className='flex items-start gap-2 mb-2'>
            <Skeleton className='flex-1/2 h-30' />
            <Skeleton className='flex-1/2 h-30' />
          </div>
          <div className='flex items-start gap-2'>
            <Skeleton className='flex-1/3 h-20' />
            <Skeleton className='flex-1/3 h-20' />
            <Skeleton className='flex-1/3 h-20' />
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventUserSkeleton