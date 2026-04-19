"use client"

import { useTranslations } from 'next-intl';
import React from 'react'

const AboutPage = () => {
  const t = useTranslations('About');

  return (
    <div className="
      px-6 pt-24 h-full max-h-screen relative bg-cover bg-center overflow-y-hidden
      bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.75)),url('/images/home/about-img.png')]
    ">
      <div>
        <span className='nohemi text-[#5227FF]/70 font-extralight text-xl'>{t('photograph')}</span>
        <h1 className='nohemi text-white text-7xl mb-32'>Mihai</h1>
        <p className='text-white text-sm'>{t('p1')}</p>
      </div>

      <p className='text-white/80 mt-30 mb-28 text-sm text-right'>{t('p2')}</p>
    </div>
  )
}

export default AboutPage