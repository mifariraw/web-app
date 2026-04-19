"use client"

import React from 'react'
import logo from "@public/images/White.svg";
import StaggeredMenu from './StaggeredMenu';
import { usePathname } from "next/navigation";
import { useDisableScroll } from '@src/hooks/useDisableScroll';
import { useTranslations } from 'next-intl';

const socialItems = [
  { label: 'TikTok', link: 'https://www.tiktok.com/@mifari.raw' },
  { label: 'Instagram', link: 'https://www.instagram.com/mifari.raw' },
  { label: 'Facebook', link: 'https://www.facebook.com/profile.php?id=61575728319624' }
];


const MobileNavbar = () => {
  useDisableScroll(true)
  const t = useTranslations('MobileNavbar');
  const pathname = usePathname();

  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'Contact', link: '/contact' },
    { label: t('about'), link: '/about' },
    { label: t('concerts'), link: '/events/concert' },
    { label: t('events'), link: '/events/event' },
    { label: t('potraits'), link: '/events/potrait' },
    { label: t('personalProjects'), link: '/events/personal_projects' },
  ];

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div 
      style={{ height: '100vh', background: 'transparent' }} 
      className='w-full h-full absolute lg:hidden'
    >
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={false}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        logoUrl={logo}
        accentColor="#5227FF"
        // onMenuOpen={() => console.log('Menu opened')}
        // onMenuClose={() => console.log('Menu closed')}
      />
    </div>
  )
}

export default MobileNavbar