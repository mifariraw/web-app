import React from 'react'
import { IconArrowRight } from '@tabler/icons-react'
import Image, { StaticImageData } from 'next/image';
import { cn } from '@src/lib/utils';

interface HomeCardProps {
  title: string;
  subtitle?: string;
  bgImage: string | StaticImageData
  handleClick: () => void
}

const HomeCard = ({ 
  title, 
  subtitle, 
  bgImage,
  handleClick
}: HomeCardProps) => {
  return (
    <div 
      onClick={handleClick}
      className={cn(
        `w-full rounded-3xl aspect-1/1.5 relative bg-cover`,
        // "lg:w-1/4 shrink-0"
      )}
    >
      <Image
        src={bgImage}
        alt=''
        fill
        className='absolute inset-0 z-0 rounded-3xl'
      />

      <div className='z-10 h-full relative w-full flex flex-col justify-between px-6 py-4'>
        <span className='nohemi text-xl text-shadow text-white'>{title}</span>
        
        <div className={'flex-center-between w-full'}>
          {(subtitle && subtitle.length > 0) && 
            <span className='nohemi text-xl text-white'>{subtitle}</span>
          }
          <IconArrowRight size={32} className='text-white' />
        </div>
      </div>
    </div>
  )
}

export default HomeCard