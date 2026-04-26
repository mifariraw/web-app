"use client"

import HomeCard from "@src/components/HomeCard";
import { Swiper, SwiperSlide } from "swiper/react";
import aboutImage from "@public/images/home/about-img.png"
import concertsImage from "@public/images/home/concerts-img.jpg"
import portraitsImage from "@public/images/home/portraits-img.jpg"
import "swiper/css";
import "swiper/css/effect-coverflow";
import { IconChevronLeft, IconChevronRight, IconPointFilled } from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@src/lib/utils";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { Swiper as SwiperType } from 'swiper/types';

const cardsContent = [
  {
    title: "eventsCard",
    subtitle: "",
    bgImage: aboutImage,
    url: "event"
  },
  {
    title: "concertsCard",
    subtitle: "",
    bgImage: concertsImage,
    url: "concert"
  },
  {
    title: "projectsCard",
    subtitle: "",
    bgImage: aboutImage,
    url: "personal_project"
  },
  {
    title: "portraitsCard",
    subtitle: "",
    bgImage: portraitsImage,
    url: "portraits"
  },
]

export default function Home() {
  const t = useTranslations('Home');
  const router = useRouter()
  const [mobileSwiper, setMobileSwiper] = useState<SwiperType | null>(null)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black pt-24">
      <main className={cn(
        "flex flex-1 w-full flex-col items-center justify-start px-4 mt-4 dark:bg-black sm:items-start",
        "xl:justify-center xl:mt-8"
      )}>
        <div className="w-full hidden lg:block">
          <Swiper
            onSwiper={setSwiper}
            centeredSlides
            initialSlide={1}
            slidesPerView={3.25}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false
            }}
            className={"w-full relative"}
            onSlideChange={(e) => setActiveIndex(e.activeIndex)}
          >
            {cardsContent.map((card, i) => (
              <SwiperSlide
                key={i}
                className={cn(
                  "w-full flex items-center justify-center px-16 transition-all duration-300 ease-in-out",
                  "lg:px-6",
                  "2xl:px-10"
                )}
                onClick={() => {
                  if (activeIndex !== i) {
                    swiper?.slideTo(i)
              
                    return
                  }
                  return router.replace("/events/" + card.url)
                }}
              >
                <HomeCard 
                  title={t(card.title)}
                  subtitle={card.subtitle}
                  bgImage={card.bgImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="w-full lg:hidden">
          <Swiper
            onSwiper={setMobileSwiper}
            centeredSlides
            slidesPerView={"auto"}
            className={cn(
              "w-full relative",
              "sm:w-3/4",
              "md:w-1/2",
            )}
            onSlideChange={(e) => setActiveIndex(e.activeIndex)}
          >
            {cardsContent.map((card, i) => (
              <SwiperSlide
                key={i}
                className={cn(
                  "w-full flex items-center justify-center px-3 transition-all duration-300 ease-in-out",
                  activeIndex === i && "cursor-pointer"
                )}
                onClick={() => router.replace("/events/" + card.url)}
              >
                <HomeCard 
                  title={t(card.title)}
                  subtitle={card.subtitle}
                  bgImage={card.bgImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={cn(
          "hidden items-center absolute w-fit bottom-4 left-1/2 -translate-x-1/2 justify-center gap-4",
          "lg:bottom-2"
        )}>
          <div className={cn(
            "flex-center gap-1 bg-black/30 backdrop-blur-md mx-auto p-2 rounded-full",
            
          )}>
            {Array(4).fill(0).map((_, i) => (
              <IconPointFilled key={i} className={cn(
                "text-white z-10 opacity-40 transition-all duration-200 ease-in",
                activeIndex === i && "opacity-100"
              )} />
            ))}
          </div>
          <IconChevronLeft 
            size={30} 
            className={cn(
              'text-white z-10 opacity-80', 
              activeIndex === 0 && "opacity-30 pointer-events-none"
            )}
            onClick={() => swiper?.slidePrev()}
          />
          <IconChevronRight
            size={30} 
            className={cn(
              'text-white z-10 opacity-80', 
              activeIndex === 3 && "opacity-30 pointer-events-none"
            )}
            onClick={() => swiper?.slideNext()}
          />
        </div>

        <div className={cn(
          "flex-center gap-1 bg-black/30 backdrop-blur-md mx-auto p-2 rounded-full",
          "md:mt-4",
          "lg:hidden!"
        )}>
          {Array(4).fill(0).map((_, i) => (
            <IconPointFilled key={i} className={cn(
              "text-white z-10 opacity-40 transition-all duration-200 ease-in",
              activeIndex === i && "opacity-100"
            )} />
          ))}
        </div>
      </main>
    </div>
  );
}