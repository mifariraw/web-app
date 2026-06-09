'use client'

import { useEvents } from '@src/hooks/useEvents'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import EventCard from './EventCard';
import { 
  IconAppsOff, IconCalendarWeekFilled, 
  IconChevronLeft, IconChevronRight, 
  IconLibraryPhoto, IconMapPinFilled, 
  IconPointFilled, IconThumbUp, 
  IconThumbUpFilled 
} from '@tabler/icons-react';
import { cn } from '@lib/utils';
import { useEffect, useState } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import Gallery from '@src/app/admin/event/[id]/EventGallery';
import { format } from 'date-fns';
import EventUserSkeleton from '@components/skeletons/EventUserSkeleton';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@components/ui/button';
import Link from 'next/link';
import { likeEvent, unlikeEvent } from '@lib/user';

const EventView = ({ type }: { type: string }) => {
  const { events, loading } = useEvents(type, '/api/events')
  const t = useTranslations('EventsPage')
  const locale = useLocale()
  const [likedEvents, setLikedEvents] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []

    const stored = localStorage.getItem('liked_events');
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  })
  const [mobileEventsSwiper, setMobileEventsSwiper] = useState<SwiperType | null>(null)
  const [eventsSwiper, setEventsSwiper] = useState<SwiperType | null>(null)
  const [dotsSwiper, setDotsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const addItem = (id: string) => {
    setLikedEvents(prev => [...prev, id]);

    likeEvent(id)
  };

  const removeItem = (id: string) => {
    setLikedEvents(prev => prev.filter(e => e !== id));

    unlikeEvent(id)
  };

  useEffect(() => {
    localStorage.setItem('liked_events', JSON.stringify(likedEvents));
  }, [likedEvents]);

  useEffect(() => {
    console.log('activeIndex changed:', activeIndex);
    dotsSwiper?.slideTo(activeIndex);
  }, [activeIndex, dotsSwiper])

  if (!loading && !events.length) {
    return (
      <div className='pt-24 z-10 text-white'>
        <div className='flex flex-col gap-2 items-center justify-center py-8'>
          <IconAppsOff size={128} className='opacity-70 text-white' />
          <span className='z-10 text-2xl mt-24 text-center'>
            {t('noEvents')}
          </span>

          <Button
            variant={'outline'}
            className='bg-transparent hover:bg-transparent px-8 py-6 border-white mt-24'
          >
            <Link href={'/'} className='text-white text-xl'>Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (loading || !events.length) {
    return (
      <div className='pt-24'>
        <EventUserSkeleton galleryText={t('gallery')} />
      </div>
    )
  }
  
  return (
    <div className='px-7 pt-24'>
      <h3 className='z-10 relative text-white text-center text-lg'>
        {t(`${type}`)}
      </h3>

      <div className='w-full hidden lg:block'>
        <Swiper
          onSwiper={setEventsSwiper}
          effect='coverflow'
          centeredSlides
          slidesPerView={2.5}
          modules={[EffectCoverflow]} // Removed Controller
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: false,
          }}
          onSlideChange={(e) => {
            setActiveIndex(e.activeIndex);
            // dotsSwiper?.slideTo(e.activeIndex); // Manually sync dots
          }}
          className={'w-full fade-edges'}
        >
          {events.map((e, i) => (
            <SwiperSlide
              key={i}
              className={cn(
                'no-swiper-blur w-full flex items-center justify-center px-3',
                'xl:px-5',
                '2xl:px-8'
              )}
            >
              <EventCard event={e} isActive={activeIndex === i} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='w-full lg:hidden'>
        <Swiper
          onSwiper={setMobileEventsSwiper}
          effect='coverflow'
          centeredSlides
          slidesPerView={'auto'}
          modules={[EffectCoverflow]} // Removed Controller
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          onSlideChange={(e) => {
            setActiveIndex(e.activeIndex);
            // dotsSwiper?.slideTo(e.activeIndex); // Manually sync dots
          }}
          className={cn('w-full', 'sm:w-4/5')}
        >
          {events.map((e, i) => (
            <SwiperSlide
              key={i}
              className='w-full flex items-center justify-center px-3'
            >
              <EventCard event={e} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='flex-center gap-4 mt-8'>
        <Swiper
          onSwiper={setDotsSwiper}
          aria-disabled
          grabCursor
          modules={[]}
          slidesPerView={3}
          allowTouchMove={false}
          className='w-20 mx-0! bg-black/30 backdrop-blur-md rounded-full'
        >
          {events.map((_, i) => (
            <SwiperSlide
              key={i}
              className='w-full flex items-center justify-center'
            >
              <IconPointFilled key={i} className={cn(
                'text-white z-10 opacity-40 transition-all duration-200 ease-in',
                activeIndex === i && 'opacity-100'
              )} />
            </SwiperSlide>
          ))}
        </Swiper>
        <IconChevronLeft 
          size={30} 
          className={cn(
            'text-white z-10 opacity-80', 
            activeIndex === 0 && 'opacity-30 pointer-events-none'
          )}
          onClick={() => {
            if (typeof window === 'undefined') return;
            
            if (window.innerWidth >= 1024) {
              eventsSwiper?.slidePrev();
            } else {
              mobileEventsSwiper?.slidePrev();
            }
          }}
        />
        <IconChevronRight
          size={30} 
          className={cn(
            'text-white z-10 opacity-80', 
            activeIndex === events.length - 1 && 'opacity-30 pointer-events-none'
          )}
          onClick={() => {
            mobileEventsSwiper?.slideNext()
            eventsSwiper?.slideNext()
          }}
        />
      </div>

      <div className='flex flex-col items-center justify-center z-10 text-lg text-white mt-4'>
        <div className={cn(
          'flex-center gap-2 z-10',
          'lg:text-2xl'
        )}>
          <IconMapPinFilled size={24} className='opacity-60' />
          <span>
            {locale === 'ro' 
              ? events[activeIndex].location
              : events[activeIndex].locationTranslation
            }
          </span>
        </div>

        <div className={cn(
          'flex-center gap-2 z-10',
          'lg:text-2xl'
        )}>
          <IconCalendarWeekFilled size={24} className='opacity-60' />
          <span>
            {format(
              events[activeIndex].date, 
              locale === 'ro' ? 'dd-MM-yyyy' : 'MM-dd-yyyy'
            )}
          </span>
        </div>
      </div>
      
      <div className={cn(
        'flex flex-col text-white mt-16 mb-8 z-10',
        'lg:px-8'
      )}>
        <div className='flex-center-between z-10'>
          <h2 className='flex-center gap-2 whitespace-nowrap'>
            <IconLibraryPhoto size={28} />
            <span className='text-2xl uppercase font-bold'>
              {t('gallery')}
            </span>
          </h2>
          
          {!likedEvents.includes(events[activeIndex]._id.toString())
            ? (
              <IconThumbUp 
                size={28} 
                onClick={() => addItem(events[activeIndex]._id.toString())}
                className='opacity-80'
              />
            ) : (
              <IconThumbUpFilled 
                size={28} 
                onClick={() => removeItem(events[activeIndex]._id.toString())}
                className='opacity-80'
              />
            )
          }
        </div>
        <Gallery 
          id={events[activeIndex]._id.toString()}
          folder={events[activeIndex].type}
          photos={events[activeIndex].images ?? []} 
          noPhotosText={t('noPhotos')}
          isDisabled
        />
      </div>
    </div>
  )
}

export default EventView