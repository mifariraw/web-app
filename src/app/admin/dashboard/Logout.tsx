"use client"

import { Button } from '@src/components/ui/button'
import { cn } from '@src/lib/utils'
import { IconLoader2, IconLogout } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)

    await fetch("/api/logout", {
      method: "POST",
    })
      .finally(() => {
        setIsLoggingOut(false)
        router.replace("/")
      })
  }

  return (
    <Button 
      onClick={handleLogout} 
      className={cn(
        'px-6',
      )}
    >
      {isLoggingOut ? (
        <IconLoader2 className='rotate' />
      ) : (
        <IconLogout />
      )}
      Logout
    </Button>
  )
}

export default Logout