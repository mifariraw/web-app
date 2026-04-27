'use client'

import { Button } from '@components/ui/button'
import { cn } from '@lib/utils'
import { logoutAdmin } from '@src/lib/admin'
import { IconLoader2, IconLogout } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  async function handleLogout () {
    setIsLoggingOut(true)

    try {
      await logoutAdmin()
      
      toast.success('Logged out')
    } catch {
      toast.success('Eroare')
    }

    setIsLoggingOut(false)
    router.replace('/')
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