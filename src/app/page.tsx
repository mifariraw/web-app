"use client"

import HomeCard from "@src/components/HomeCard";
import { Swiper, SwiperSlide } from "swiper/react";
import aboutImage from "@public/images/home/about-image.png"
import "swiper/css";
import "swiper/css/effect-coverflow";
import { IconPointFilled } from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@src/lib/utils";
import { useRouter } from "next/navigation";

const cardsContent = [
  {
    title: "Evenimente",
    subtitle: "",
    bgImage: aboutImage,
    url: "event"
  },
  {
    title: "Concerte/Festivaluri",
    subtitle: "",
    bgImage: aboutImage,
    url: "concert"
  },
  {
    title: "Proiecte Personale",
    subtitle: "",
    bgImage: aboutImage,
    url: "personal_project"
  },
  {
    title: "Portrete",
    subtitle: "Fotograf",
    bgImage: aboutImage,
    url: "portraits"
  },
]

export default function Home() {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black pt-32">
      <main className="flex flex-1 w-full flex-col items-center justify-between px-4 dark:bg-black sm:items-start">
        <Swiper
          grabCursor
          centeredSlides
          slidesPerView={1}
          className="w-full"
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        >
          {cardsContent.map((card, i) => (
            <SwiperSlide
              key={i}
              className="w-full flex items-center justify-center px-3"
            >
              <HomeCard 
                title={card.title}
                subtitle={card.subtitle}
                bgImage={card.bgImage}
                handleClick={() => router.replace("/events/" + card.url)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex-center gap-1 mt-4 bg-black/30 backdrop-blur-md p-2 rounded-full">
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
