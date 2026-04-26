"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from "@public/images/White.svg";
import Link from 'next/link';
import { cn } from '@src/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { IconDashboard, IconLoader2, IconLogout } from '@tabler/icons-react';
import { useRouter, usePathname } from "@src/i18n/navigation";
import { useParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"
import usFlag from "@public/images/us-flag-bw.png"
import roFlag from "@public/images/ro-flag-bw.png"

const Navbar = () => {
  const t = useTranslations('Navbar')
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const locale = useLocale()
  const curentPathname = usePathname()
  const params = useParams()
  const router = useRouter()

  const changeLocale = (newLocale: string) => {
    const type = params.type as string

    router.replace(
      {
        pathname: curentPathname,
        params: { type: type }
      }, {locale: newLocale});
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)

    await fetch("/api/logout", {
      method: "POST",
    })
      .finally(() => {
        setIsAdmin(false)
      })
  }

  useEffect(() => {
    fetch("/api/me")
      .then(res => res.json())
      .then(data => setIsAdmin(data.authenticated));
  }, []);

  return (
    <div className={cn(
      'items-center justify-between hidden w-full px-16 pt-8 absolute top-0 left-0 z-20',
      'lg:flex'
    )}>
      <Image
        src={logo}
        width={300}
        height={300}
        alt='MifariRaw'
        className='w-30 mr-auto'
      />

      <div className='flex-center gap-16 text-white nohemi'>
        <Link 
          href="/"
          className='relative group'
        >
          <span className='opacity-0 transition-all duration-150 ease-in group-hover:opacity-100'>
            Home
          </span>
          <span className='w-20 opacity-100 h-1 bg-white absolute left-1/2 -translate-1/2 top-1/2 group-hover:opacity-0 transition-all duration-150 ease-in' />
        </Link>
        <Link 
          href="/contact"
          className='relative group'
        >
          <span className='opacity-0 transition-all duration-150 ease-in group-hover:opacity-100'>
            Contact
          </span>
          <span className='w-20 opacity-100 h-1 bg-white absolute left-1/2 -translate-1/2 top-1/2 group-hover:opacity-0 transition-all duration-150 ease-in' />
        </Link>
        <Link 
          href="/about"
          className='relative group'
        >
          <span className='opacity-0 transition-all duration-150 ease-in group-hover:opacity-100'>
            {t('about')}
          </span>
          <span className='w-20 opacity-100 h-1 bg-white absolute left-1/2 -translate-1/2 top-1/2 group-hover:opacity-0 transition-all duration-150 ease-in' />
        </Link>
        <div className='flex-center gap-4'>
          <Link 
            href={isAdmin ? "/admin/dashboard" : "/" + locale + "/login"}
            className='relative group'
          >
            {isAdmin ? (
              <IconDashboard />
            ) : (
              <>
                <span className='opacity-0 transition-all duration-150 ease-in group-hover:opacity-100'>
                  Login
                </span>
                <span className='w-20 opacity-100 h-1 bg-white absolute left-1/2 -translate-1/2 top-1/2 group-hover:opacity-0 transition-all duration-150 ease-in' />
              </>
            )}
          </Link>
          {isAdmin && (
            isLoggingOut ? (
              <IconLoader2 className='rotate' />
            ) : (
              <IconLogout onClick={handleLogout} />
            )
          )}

          <Select
            name="locale"
            value={locale}
            defaultValue={locale}
            onValueChange={changeLocale}
          >
            <SelectTrigger
              id="locale"
              className={cn("w-fit", !isAdmin && "ml-8")}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ro">
                  <Image
                    src={roFlag}
                    width={roFlag.width}
                    height={roFlag.height}
                    alt=''
                    className='w-6 aspect-auto'
                  />
                  RO (ROU)
                </SelectItem>
                <SelectItem value="en">
                  <Image
                    src={usFlag}
                    width={usFlag.width}
                    height={usFlag.height}
                    alt=''
                    className='w-6 aspect-auto'
                  />
                  EN (US)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default Navbar