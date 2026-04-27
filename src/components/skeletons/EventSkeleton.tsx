import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { 
  IconDownload, IconLibraryPhoto, 
  IconLoader2, IconSquare, 
  IconTrash 
} from '@tabler/icons-react';
import { cn } from '@src/lib/utils';

const EventSkeleton = () => {
  return (
    <div className='p-4 h-full relative'>
      <section className={cn(
        'w-full flex flex-col items-center justify-center gap-4',
        'xl:flex-row! xl:justify-around xl:px-12 xl:pt-4'
      )}>
        <div className={cn(
          'flex flex-col w-full gap-4 items-center',
          'xl:w-3/5',
          'xl:w-1/2'
        )}>
          <div className={cn(
            'relative w-3/5',
            'sm:w-2/5',
            'xl:w-full',
          )}>
            <Skeleton className={cn(
              'w-full aspect-square'
            )} />
            <Skeleton className={cn(
              'w-full h-6 xl:h-8 mt-4',
            )} />
          </div>
        </div>
      
        <div className={cn(
          'flex flex-col w-full gap-2',
          'xl:px-8 xl:gap-16'
        )}>
          <div className={cn(
            'flex flex-col w-full items-start gap-1',
            'sm:text-xl',
          )}>
            <div className={cn(
              'flex flex-col gap-1 items-start w-full',
              'xl:gap-2 xl:text-2xl'
            )}>
              <Skeleton className={cn(
                'w-1/2 h-6',
                'xl:h-10'
              )} />
              <Skeleton className={cn(
                'w-1/2 h-6',
                'xl:h-10'
              )} />
            </div>
            <div className={cn(
              'flex flex-col gap-1 items-start w-full',
              'xl:gap-2 xl:text-2xl'
            )}>
              <Skeleton className={cn(
                'w-1/2 h-6',
                'xl:h-10'
              )} />
              <Skeleton className={cn(
                'w-1/2 h-6',
                'xl:h-10'
              )} />
            </div>
          </div>

          <div className={cn(
            'flex-center gap-2 w-full',
          )}>
            <Skeleton className='flex-1/2 h-8 xl:h-10' />
            <Skeleton className='flex-1/2 h-8 xl:h-10' />
          </div>
        </div>
      </section>

      <Separator className='my-4' />

      <section>
        <div className='flex-center-between'>
          <h2 className='flex-center gap-2 whitespace-nowrap'>
            <IconLibraryPhoto size={24} />
            <span className={cn(
              'text-xl font-bold',
              'xl:text-2xl'
            )}>Galerie</span>
            <IconLoader2 size={20} className='rotate' />
          </h2>
        </div>

        <div className='flex-center-between my-2'>
          <IconSquare 
            size={20}
            className='pointer-events-none opacity-40'
          />
        
          <div className='flex-center gap-4'>
            <IconTrash size={20} className='text-destructive pointer-events-none opacity-40' />  

            <IconDownload 
              size={20} 
              className='pointer-events-none opacity-40'
            />
          </div>
        </div>

        <div className={cn(
          'h-50',
          'md:h-70',
          'xl:h-100'
        )}>
          <div className='flex items-start gap-2 mb-2 h-3/5'>
            <Skeleton className='flex-1/2 h-full' />
            <Skeleton className='flex-1/2 h-full' />
          </div>
          <div className='flex items-start gap-2 h-2/5'>
            <Skeleton className='flex-1/3 h-full' />
            <Skeleton className='flex-1/3 h-full' />
            <Skeleton className='flex-1/3 h-full' />
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventSkeleton