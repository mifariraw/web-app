import React from 'react'

const AboutPage = () => {
  return (
    <div className="
      px-6 pt-24 h-full relative bg-cover bg-center
      bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.75)),url('/images/home/about-img.png')]
    ">
      <div>
        <span className='nohemi text-[#5227FF]/70 font-extralight text-xl'>Fotograf</span>
        <h1 className='nohemi text-white text-7xl mb-32'>Mihai</h1>
        <p className='text-white text-sm'>Ian este cel mai influent artist de muzica urbana din Romania, avand un catalog remarcabil de hituri. Cu o audienta de peste 350.000 de ascultatori lunari si peste 200 milioane de streamuri, Ian domina locul #1 in top-urile oficiale ale platformelor digitale.</p>
      </div>

      <p className='text-white/80 mt-30 mb-20 text-sm text-right'>Printre cateva dintre realizarile sale se numara 3 albume lansate care au ocupat prima pozitie in topuri timp de numeroase luni consecutive, dar si si colaborari cu artisti internationali ca R3hab si Smokepurpp.</p>
    </div>
  )
}

export default AboutPage