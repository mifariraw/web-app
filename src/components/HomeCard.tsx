import { IconArrowRight } from '@tabler/icons-react'
import Image, { StaticImageData } from 'next/image';
import { cn } from '@lib/utils';

interface HomeCardProps {
  title: string;
  subtitle?: string;
  bgImage: string | StaticImageData;
  isPersonalProject?: boolean
}

const HomeCard = ({ 
  title, 
  subtitle, 
  bgImage,
  isPersonalProject = false
}: HomeCardProps) => {
  console.log(title)
  return (
    <div className='w-full bg-black rounded-3xl aspect-1/1.5 relative overflow-hidden isolate'>
      <Image
        src={bgImage}
        alt=''
        fill={!isPersonalProject}
        className={cn(
          'absolute inset-0 object-cover z-0 rounded-3xl',
          isPersonalProject && "top-1/2 -translate-y-1/2 rounded-none px-3"
        )}
      />

      <div className='z-10 h-full relative w-full flex flex-col justify-between px-6 py-4'>
        <span className={cn(
          'nohemi text-xl text-white whitespace-nowrap',
          ['Evenimente', 'Events'].includes(title) && 'text-black',
          'lg:text-lg',
          'xl:text-2xl',
          '2xl:text-3xl'
        )}>{title}</span>
        
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
