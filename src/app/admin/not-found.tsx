import { Button } from '@src/components/ui/button'
import { IconDashboard, IconError404 } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-4'>
      <div className='relative'>
        <IconError404 size={180} className='z-1'/>
        <IconError404 size={180} className='opacity-40 absolute -bottom-2 -right-2' />
      </div>
      <p className='text-2xl capitalize'>Pagina nu exista</p>

      <Button variant={"outline"}>
        <Link href={"/admin/dashboard"} className='flex items-center gap-2'>
          <IconDashboard />
          Dashboard
        </Link>
      </Button>
    </div>
  )
}

export default NotFound