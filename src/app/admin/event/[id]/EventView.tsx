"use client"

import EventSkeleton from '@src/components/skeletons/EventSkeleton'
import { Separator } from '@src/components/ui/separator'
import { useEvents } from '@src/hooks/useEvents'
import { IconCalendarEvent, IconLanguage, IconLibraryPhoto, IconMapPin, IconReload, IconThumbUp } from '@tabler/icons-react'
import { format } from 'date-fns'
import { ro } from 'date-fns/locale'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import Gallery from './EventGallery'
import { Button } from '@src/components/ui/button'

const EditEventDialog = dynamic(() => import("./EditEventDialog"), {
  loading: () => <div className="w-8 h-8" />,
  // ssr: false,
});

const DeleteEventDialog = dynamic(() => import("./DeleteEventDialog"), {
  loading: () => <div className="w-8 h-8" />,
  // ssr: false,
});

const EditImageDialog = dynamic(() => import("./EditImageDialog"), {
  loading: () => <div className="w-8 h-8" />,
  // ssr: false,
});

const ImageUploader = dynamic(() => import("./MultipleImageUploader"), {
  loading: () => <div className="w-8 h-8" />,
  // ssr: false,
});

const EventView = ({ id }: { id: string }) => {
  const { events, reload, loading } = useEvents("event", `/api/admin/event/${id}`);
  
  const currentEvent = events[0];

  if (loading || !currentEvent) {
    return <EventSkeleton />;
  }

  return (
    <div className='p-4 h-full overflow-y-auto relative'>
      <Button
        variant="outline"
        className='absolute top-4 left-4'
        onClick={reload}
      >
        <IconReload />
      </Button>

      <section className='w-full flex flex-col items-center justify-center gap-4'>
        <div className='relative w-3/5'>
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
        <h1 className="text-2xl font-bold">{currentEvent.title}</h1>
      
        <div className='flex flex-col w-full items-start gap-1'>
          <div className='flex-center gap-2'>
            <IconMapPin />
            <span>{currentEvent.location}</span>
          </div>
          <div className='flex-center gap-2'>
            <IconCalendarEvent />
            <span>{format(currentEvent.date, "PPP", { locale: ro })}</span>
          </div>
          <div className='flex-center gap-2'>
            <IconLanguage />
            <span>{currentEvent.titleTranslation}</span>
          </div>
        </div>

        <div className='flex-center gap-2 w-full'>
          <EditEventDialog event={currentEvent} />
          <DeleteEventDialog 
            id={currentEvent._id.toString()}
            folder={currentEvent.type}
            title={currentEvent?.title}
          />
        </div>
      </section>

      <Separator className='my-4' />

      <section>
        <div className="flex-center-between">
          <h2 className="flex-center gap-2 whitespace-nowrap">
            <IconLibraryPhoto size={24} />
            <span className='text-xl font-bold'>Galerie</span>
            {currentEvent?.images && (
              <span>({currentEvent?.images.length} imagini)</span>
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
  );
};

export default EventView