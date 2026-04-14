"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@src/components/ui/dialog"
import { Button } from "@src/components/ui/button"
import { IconLoader2, IconUpload } from '@tabler/icons-react'
import ImageDropzone from '@src/components/ImageDropzone'
import { updateEventImage } from '@src/lib/admin'

export const formSchema = z.object({
  coverImageUrl: z.instanceof(File),
})

const AddEventDialog = ({ id, folder }: { id: string, folder: string }) => {
  const [open, setOpen] = useState(false)
  const [isUpdatingImage, setIsUpdatingImage] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverImageUrl: undefined as unknown as File,
    },
  })

  const handleImageSelect = (file: File | null) => {
    if (file) {
      
      form.setValue("coverImageUrl", file, { 
        shouldDirty: true, 
        shouldValidate: true 
      });
    } else {
      form.setValue("coverImageUrl", undefined as unknown as File);
    }
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsUpdatingImage(true)

    updateEventImage(id, folder, data)
      .finally(() => {
        setIsUpdatingImage(false)
        setOpen(false)
      })
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className='absolute left-full top-0 ml-2 opacity-40'>
        <IconUpload size={24} />
      </DialogTrigger>
      <DialogContent className='max-h-120 overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Adauga un noua imagine de coperta</DialogTitle>
        </DialogHeader>
        <DialogDescription className={"flex flex-col gap-2"}>
          <ImageDropzone 
            selectText="Alege imaginea de coperta"
            onFileSelect={handleImageSelect}
            hasError={!!form.formState.errors.coverImageUrl}
          />

          {form.formState.errors.coverImageUrl && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.coverImageUrl.message}
            </p>
          )}
        </DialogDescription>

        <form id="form-new-event-image" onSubmit={form.handleSubmit(onSubmit)} />
        <DialogFooter>
          <DialogClose className="cursor-pointer text-gray-600 rounded-sm px-4 py-1 border"> 
            Anuleaza
          </DialogClose>
          <Button
            disabled={isUpdatingImage || !form.formState.isDirty}
            type='submit'
            form='form-new-event-image'
            // onClick={handleCreateEvent}
            className="cursor-pointer text-white rounded-sm px-4 py-1 border"
          >
            {isUpdatingImage ? (
              <IconLoader2 className="rotate" />
            ) : (
              <span>Schimba fotografia</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddEventDialog