'use client'

import EventSkeleton from '@components/skeletons/EventSkeleton'
import { Separator } from '@components/ui/separator'
import { useEvents } from '@src/hooks/useEvents'
import { 
  IconCalendarEvent, IconLanguage, 
  IconLanguageHiragana, IconLibraryPhoto, 
  IconMapPin, IconReload, IconThumbUp 
} from '@tabler/icons-react'
import { format } from 'date-fns'
import { ro } from 'date-fns/locale'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import Gallery from './EventGallery'
import { Button } from '@components/ui/button'
import { cn } from '@lib/utils'

const EditEventDialog = dynamic(() => import('./EditEventDialog'), {
  loading: () => <div className='w-8 h-8' />,
});

const DeleteEventDialog = dynamic(() => import('./DeleteEventDialog'), {
  loading: () => <div className='w-8 h-8' />,
});

const EditImageDialog = dynamic(() => import('./EditImageDialog'), {
  loading: () => <div className='w-8 h-8' />,
});

const ImageUploader = dynamic(() => import('./MultipleImageUploader'), {
  loading: () => <div className='w-8 h-8' />,
});

const EventView = ({ id }: { id: string }) => {
  const { events, reload, loading } = useEvents('event', `/api/admin/event/${id}`);
  
  const currentEvent = events[0];

  if (loading || !currentEvent) {
    return <EventSkeleton />;
  }
  
  return (
    <>
    <EventSkeleton />
    <div className='p-4 h-full overflow-y-auto relative'>
      <Button
        variant='outline'
        className='absolute top-4 left-4'
        onClick={reload}
      >
        <IconReload />
      </Button>

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
            <Image
              src={currentEvent.coverImageUrl}
              width={400}
              height={400}
              className='w-full rounded-sm'
              alt={currentEvent.title}
            />
            <EditImageDialog 
              id={currentEvent._id.toString()}
              folder={currentEvent.type}
            />
          </div>
          <h1 className={cn(
            'text-2xl font-bold',
            'sm:text-3xl'
          )}>{currentEvent.title}</h1>
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
              'flex flex-col gap-1 items-start',
              'xl:gap-2 xl:text-2xl'
            )}>
              <div className={cn(
                'flex-center gap-2',
                'xl:gap-1'
              )}>
                <IconMapPin />
                <span>{currentEvent.location}</span>
              </div>
              <div className={cn(
                'flex-center gap-2',
                'xl:gap-1'
              )}>
                <IconCalendarEvent />
                <span>{format(currentEvent.date, 'PPP', { locale: ro })}</span>
              </div>
            </div>
            <div className={cn(
              'flex flex-col itemms-start gap-1',
              'xl:gap-2 xl:text-2xl'
            )}>
              <div className={cn(
                'flex items-start gap-2',
                'xl:gap-1'
              )}>
                <IconLanguage />
                <span>{currentEvent.titleTranslation}</span>
              </div>
              <div className={cn(
                'flex items-start gap-2',
                'xl:gap-1'
              )}>
                <IconLanguageHiragana />
                <span>{currentEvent.locationTranslation}</span>
              </div>
            </div>
          </div>
          <div className={cn(
            'flex-center gap-2 w-full',
          )}>
            <EditEventDialog event={currentEvent} />
            <DeleteEventDialog 
              id={currentEvent._id.toString()}
              folder={currentEvent.type}
              title={currentEvent?.title}
            />
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
            {currentEvent?.images && (
              <span className={cn(
                'xl:text-lg'
              )}>({currentEvent?.images.length} imagini)</span>
            )}
          </h2>

          <div className='flex-center gap-2'>
            <ImageUploader 
              id={currentEvent._id.toString()} 
              folder={currentEvent.type} 
            />
            <div className='flex-center gap-1'>
              <IconThumbUp />
              <span>{currentEvent.likes}</span>
            </div>
          </div>
        </div>

        <Gallery 
          id={currentEvent._id.toString()} 
          photos={currentEvent.images || []} 
          folder={currentEvent.type} 
          noPhotosText='Nu exista poze pentru acest eveniment'
        />
      </section>
    </div>
    </>
  );
};

export default EventView