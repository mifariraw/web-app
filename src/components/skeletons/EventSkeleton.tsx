import React from 'react'
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { IconDownload, IconLibraryPhoto, IconLoader2, IconSquare, IconTrash } from '@tabler/icons-react';

const EventSkeleton = () => {
  return (
    <div className='p-4 h-full relative'>
      <section className='w-full flex flex-col items-center justify-center gap-4'>
        <Skeleton className='w-3/5 aspect-square' />
        <Skeleton className='w-3/5 h-8' />
      
        <div className='flex flex-col w-full items-start gap-1'>
          <Skeleton className='w-1/2 h-6' />
          <Skeleton className='w-1/2 h-6' />
          <Skeleton className='w-1/2 h-6' />
          <Skeleton className='w-1/2 h-6' />
        </div>
        
        <div className='flex-center gap-2 w-full'>
          <Skeleton className='flex-1/2 h-8' />
          <Skeleton className='flex-1/2 h-8' />
        </div>
      </section>

      <Separator className='my-4' />

      <section>
        <div className="flex-center-between">
          <h2 className="flex-center gap-2 whitespace-nowrap">
            <IconLibraryPhoto size={24} />
            <span className='text-xl font-bold'>Galerie</span>
            <IconLoader2 size={20} className='rotate' />
          </h2>
        </div>

        <div className="flex-center-between my-2">
          <IconSquare 
            size={20}
            className='pointer-events-none opacity-40'
          />
        
          <div className="flex-center gap-4">
            <IconTrash size={20} className="text-destructive pointer-events-none opacity-40" />  

            <IconDownload 
              size={20} 
              className='pointer-events-none opacity-40'
            />
          </div>
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

export default EventSkeleton