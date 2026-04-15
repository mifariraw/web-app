"use client"

import { useEvents } from '@src/hooks/useEvents'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { EffectCoverflow } from "swiper/modules";
import EventSkeleton from '@src/components/skeletons/EventSkeleton';
import EventCard from './EventCard';

const EventView = ({ type }: { type: string }) => {
  const { events, loading } = useEvents(type, "/api/events")

  console.log(type)

  if (loading || !events.length) {
    return <EventSkeleton />;
  }

  return (
    <div className='px-7'>
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={1}
        loop
        modules={[EffectCoverflow]}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
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
    </div>
  )
}

export default EventView