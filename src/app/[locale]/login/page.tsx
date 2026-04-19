"use client"

import React from 'react'
import { LoginForm } from './LoginForm'
import { IconHelpHexagon } from "@tabler/icons-react"
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Login = () => {
  const t = useTranslations('LoginForm');

  return (
    <div className='px-8 pt-20 flex flex-col items-center justify-center h-[calc(100vh-80px)]!'>
      <LoginForm />

      <span className='flex items-center gap-2 mt-16 opacity-70 select-none'>
        <IconHelpHexagon size={20} className='text-white' />
        <span className='text-base text-white whitespace-nowrap'>
          {t('info')}
        </span>
      </span>
      <Link href="/" className="text-white opacity-70 hover:underline hover:opacity-100 mt-2">
        {t('backHome')}
      </Link>
    </div>
  )
}

export default Login