'use client'

import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';

const AboutPage = () => {
  const t = useTranslations('About');

  return (
    <div className={cn(
      `px-6 pt-24 h-screen! flex flex-col items-stretch justify-between relative bg-cover bg-center overflow-y-hidden
      bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.75)),url('/images/home/about-img.png')]`,
      'sm:px-12',
      'lg:px-16 lg:bg-position-[center_45%]',
      'xl:bg-position-[center_40%] xl:px-32',
    )}>
      <div className='mt-8'>
        <span className='nohemi text-[#5227FF]/70 bg-white px-1 py-0.5 font-extralight text-xl'>{t('photograph')}</span>
        <h1 className={'nohemi text-white text-7xl mb-48'}>Mihai</h1>
        <p className={cn(
          'text-white text-sm',
          'sm:text-base sm:max-w-9/10',
          'md:text-lg',
          'lg:max-w-3/5',
          'xl:text-xl',
          '2xl:text-2xl'
        )}>{t('p1')}</p>
      </div>

      <p className={cn(
        'text-white/80 mt-10 mb-28 text-sm text-right',
        'sm:text-base sm:max-w-9/10 sm:ml-auto',
        'md:text-lg',
        'lg:max-w-3/5 lg:mt-16',
        'xl:text-xl',
        '2xl:text-2xl 2xl:mt-30 2xl:mb-30'
      )}>{t('p2')}</p>
    </div>
  )
}

export default AboutPage