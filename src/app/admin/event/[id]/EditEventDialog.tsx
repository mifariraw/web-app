'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Calendar } from '@components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover'
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@components/ui/field'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { IconCalendar, IconLoader2, IconPencil } from '@tabler/icons-react'
import { format } from 'date-fns/format'
import { cn } from '@lib/utils'
import { ro } from 'date-fns/locale'
import { IEvent } from '@src/models/interfaces'
import { updateEvent } from '@lib/admin'
import { toast } from 'sonner'

export const formSchema = z.object({
  title: z.string().min(1, 'Titlul este obligatoriu'),
  titleTranslation: z.string().min(1, 'Traducerea este obligatorie'),
  location: z.string().min(1, 'Locația este obligatorie'),
  locationTranslation: z.string().min(1, 'Traducerea este obligatorie'),
  date: z.date(),
    // .refine((date) => date > new Date(), 'Data trebuie să fie în viitor'),
})

const EditEventDialog = ({ event }: { event: IEvent }) => {
  const [open, setOpen] = useState(false)
  const [isUpdatingEvent, setIsUpdatingEvent] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title || '',
      titleTranslation: event?.titleTranslation || '',
      location: event?.location || '',
      locationTranslation: event?.locationTranslation || '',
      date: event?.date || new Date(),
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsUpdatingEvent(true)

    try {
      await updateEvent(event._id.toString(), data)
      
      toast.success('Event actualizat')
    } catch {
      toast.error('Eroare in actualizarea eventului')
    }

    setIsUpdatingEvent(false)
    setOpen(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className={'flex-center justify-center bg-black text-white hover:text-white w-full gap-2 py-1 rounded-sm'}>
          <IconPencil size={16} />
          Editeaza
        </span>
      </DialogTrigger>
      <DialogContent className='max-h-120 overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Editeaza {event?.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className={'flex flex-col gap-2'}>
        </DialogDescription>

        <form id='form-edit-event' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className='flex-center-between'>
                    <FieldLabel htmlFor='form-title'>
                      Titlu
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <Input
                    {...field}
                    id='form-title'
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
            <Controller
              name='titleTranslation'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className='flex-center-between'>
                    <FieldLabel htmlFor='form-title-translation'>
                      Traducere Titlu
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <Input
                    {...field}
                    id='form-title-translation'
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
            <Controller
              name='location'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className='flex-center-between'>
                    <FieldLabel htmlFor='form-location'>
                      Locație
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <Input
                    {...field}
                    id='form-location'
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
            <Controller
              name='locationTranslation'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className='flex-center-between'>
                    <FieldLabel htmlFor='form-location-translation'>
                      Traducere Locație
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <Input
                    {...field}
                    id='form-location-translation'
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
            <Controller
              name='date'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className='flex-center-between'>
                    <FieldLabel>Data</FieldLabel>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </div>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <IconCalendar className='mr-2 h-4 w-4' />
                        {field.value ? format(field.value, 'PPP', { locale: ro }) : <span>Alege o dată</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange} // Updates the form state
                        disabled={(date) => date < new Date('1900-01-01')}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose className='cursor-pointer text-gray-600 rounded-sm px-4 py-1 border'> 
            Anuleaza
          </DialogClose>
          <Button
            disabled={isUpdatingEvent || !form.formState.isDirty}
            type='submit'
            form='form-edit-event'
            // onClick={handleCreateEvent}
            className='cursor-pointer text-white rounded-sm px-4 py-1 border'
          >
            {isUpdatingEvent ? (
              <IconLoader2 className='rotate' />
            ) : (
              <span>Trimite</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditEventDialog