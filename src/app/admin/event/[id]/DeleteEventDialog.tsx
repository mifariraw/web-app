'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { IconLoader2, IconTrash } from '@tabler/icons-react'
import { Button } from '@components/ui/button'
import { deleteEvent } from '@lib/admin'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface DeleteEventDialogProps {
  id: string;
  title: string;
  folder: string
}

const DeleteEventDialog = ({ id, folder, title }: DeleteEventDialogProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isDeleteingEvent, setIsDeleteingEvent] = useState(false)

  async function handleDelete() {
    setIsDeleteingEvent(true)

    try {
      await deleteEvent(id, folder)
      
      toast.success('Event sters')
    } catch {
      toast.error('Eroare in stergerea eventului')
    }

    setIsDeleteingEvent(false)
    setOpen(false)
    router.replace('/admin/dashboard')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className={'flex-center justify-center bg-gray-200 hover:bg-gray-200 text-destructive hover:text-destructive w-full gap-2 py-1 rounded-sm'}>
          <IconTrash size={16} />
          Sterge
        </span>
      </DialogTrigger>
      <DialogContent className='max-h-120 overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Sterge {title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className={'flex flex-col gap-2'}>
          Atentie! Urmeaza sa stergi acest eveniment
        </DialogDescription>
        <DialogFooter>
          <DialogClose className='cursor-pointer text-gray-600 rounded-sm px-4 py-1 border'> 
            Anuleaza
          </DialogClose>
          <Button
            disabled={isDeleteingEvent}
            onClick={handleDelete}
            className='cursor-pointer text-white bg-destructive rounded-sm px-4 py-1 border'
          >
            {isDeleteingEvent ? (
              <IconLoader2 className='rotate' />
            ) : (
              <span>Sterge</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteEventDialog