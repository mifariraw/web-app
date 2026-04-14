import React from 'react'
import aboutImage from "@public/images/home/about-img.png"
import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

const HomeCard = () => {
  return (
    <div className='w-full rounded-3xl aspect-1/1.5 relative bg-[url(@public/images/home/about-image.png)] bg-cover'>
      <div className='h-full w-full flex flex-col justify-between px-6 py-4'>
        <span className='nohemi text-xl text-shadow text-white'>Despre Mihai</span>
        
        <div className='flex-center-between'>
          <span className='nohemi text-xl text-white'>Fotograf</span>
          <IconArrowRight size={32} className='text-white' />
        </div>
      </div>
    </div>
  )
}

export default HomeCard