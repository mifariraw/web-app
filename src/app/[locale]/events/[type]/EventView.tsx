"use client"

import { useEvents } from '@src/hooks/useEvents'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { Controller, EffectCoverflow } from "swiper/modules";
import EventCard from './EventCard';
import { IconCalendarWeekFilled, IconChevronLeft, IconChevronRight, IconLibraryPhoto, IconMapPinFilled, IconPointFilled, IconThumbUp, IconThumbUpFilled } from '@tabler/icons-react';
import { cn } from '@src/lib/utils';
import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import Gallery from '@src/app/admin/event/[id]/EventGallery';
import { format } from 'date-fns';
import EventUserSkeleton from '@src/components/skeletons/EventUserSkeleton';
import { useLocale, useTranslations } from "next-intl";

const EventView = ({ type }: { type: string }) => {
  const { events, loading } = useEvents(type, "/api/events")
  const t = useTranslations('EventsPage')
  const locale = useLocale()
  const [eventsSwiper, setEventsSwiper] = useState<SwiperType | null>(null)
  const [dotsSwiper, setDotsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

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
      <Swiper
        onSwiper={setEventsSwiper}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={"auto"}
        modules={[EffectCoverflow, Controller]}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        controller={{ control: dotsSwiper }}
        className="w-full"
      >
        {events.map((e, i) => (
          <SwiperSlide
            key={i}
            className="w-full flex items-center justify-center px-3"
          >
            <EventCard event={e} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='flex-center gap-4 mt-8'>
        <Swiper
          onSwiper={setDotsSwiper}
          aria-disabled
          grabCursor
          modules={[Controller]}
          controller={{ control: dotsSwiper }}
          slidesPerView={3}
          centeredSlides
          allowTouchMove={false}
          className="w-20 mx-0! bg-black/30 backdrop-blur-md rounded-full"
        >
          {events.map((_, i) => (
            <SwiperSlide
              key={i}
              className="w-full flex items-center justify-center"
            >
              <IconPointFilled key={i} className={cn(
                "text-white z-10 opacity-40 transition-all duration-200 ease-in",
                activeIndex === i && "opacity-100"
              )} />
            </SwiperSlide>
          ))}
        </Swiper>
        <IconChevronLeft 
          size={30} 
          className={cn(
            'text-white z-10 opacity-80', 
            activeIndex === 0 && "opacity-30 pointer-events-none"
          )}
          onClick={() => eventsSwiper?.slidePrev()}
        />
        <IconChevronRight
          size={30} 
          className={cn(
            'text-white z-10 opacity-80', 
            activeIndex === events.length - 1 && "opacity-30 pointer-events-none"
          )}
          onClick={() => eventsSwiper?.slideNext()}
        />
      </div>

      <div className='flex flex-col items-center justify-center z-10 text-lg text-white mt-4'>
        <div className='flex-center gap-2 z-10'>
          <IconMapPinFilled size={24} className='opacity-60' />
          <span>
            {locale === "ro" 
              ? events[activeIndex].location
              : events[activeIndex].locationTranslation
            }
          </span>
        </div>

        <div className='flex-center gap-2 z-10'>
          <IconCalendarWeekFilled size={24} className='opacity-60' />
          <span>
            {format(
              events[activeIndex].date, 
              locale === "ro" ? 'dd-MM-yyyy' : "MM-dd-yyyy"
            )}
          </span>
        </div>
      </div>
      
      <div className='flex flex-col text-white mt-16 mb-8 z-10'>
        <div className="flex-center-between z-10">
          <h2 className="flex-center gap-2 whitespace-nowrap">
            <IconLibraryPhoto size={28} />
            <span className='text-2xl uppercase font-bold'>
              {t('gallery')}
            </span>
          </h2>

          <IconThumbUp size={28} />
          <IconThumbUpFilled size={28} className='hidden' />
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