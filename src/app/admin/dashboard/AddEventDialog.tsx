"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Calendar } from "@src/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@src/components/ui/popover"
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@src/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select"
import { Input } from "@src/components/ui/input"
import { Button } from "@src/components/ui/button"
import { IconCalendar, IconLoader2, IconPlus } from '@tabler/icons-react'
import ImageDropzone from '@src/components/ImageDropzone'
import { format } from 'date-fns/format'
import { cn } from '@src/lib/utils'
import { ro } from 'date-fns/locale'
import { createNewEvent } from '@src/lib/admin'

export const formSchema = z.object({
  title: z.string().min(1, "Titlul este obligatoriu"),
  titleTranslation: z.string().min(1, "Traducerea este obligatorie"),
  type: z.enum(
    ["concert", "event", "personal_project", "portraits"]
  ),
  location: z.string().min(1, "Locația este obligatorie"),
  date: z.date(),
    // .refine((date) => date > new Date(), "Data trebuie să fie în viitor"),
  coverImageUrl: z.instanceof(File),
})

const AddEventDialog = () => {
  const [open, setOpen] = useState(false)
  const [isCreatingEvent, setIsCreatingEvent] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      titleTranslation: "",
      type: "event",
      location: "",
      date: new Date(),
      coverImageUrl: undefined as unknown as File,
    },
  })

  const handleImageSelect = (file: File | null) => {
    if (file) {
      
      form.setValue("coverImageUrl", file);
      form.trigger("coverImageUrl");
    } else {
      form.setValue("coverImageUrl", undefined as unknown as File);
    }
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsCreatingEvent(true)

    createNewEvent(data)
      .finally(() => {
        setIsCreatingEvent(false)
        setOpen(false)
      })
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          type="button"
          className='bg-gray-200 w-full'
        >
          <IconPlus size={32} />
          Adauga un Event nou
        </Button> 
      </DialogTrigger>
      <DialogContent className='max-h-120 overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Adauga un nou Event</DialogTitle>
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

        <form id="form-new-event" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex-center-between">
                    <FieldLabel htmlFor="form-title">
                      Titlu
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <Input
                    {...field}
                    id="form-title"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
            <Controller
              name="titleTranslation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex-center-between">
                    <FieldLabel htmlFor="form-title-translation">
                      Traducere Titlu
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <Input
                    {...field}
                    id="form-title-translation"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex-center-between">
                    <FieldLabel htmlFor="form-type">
                      Tip Event
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    
                  >
                    <SelectTrigger
                      id="form-type"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Tip Event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="event">Eveniment</SelectItem>
                        <SelectItem value="concert">Concert/Festival</SelectItem>
                        <SelectItem value="personal_project">Proiect Personal</SelectItem>
                        <SelectItem value="portraits">Portrete</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex-center-between">
                    <FieldLabel htmlFor="form-location">
                      Locație
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <Input
                    {...field}
                    id="form-location"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex-center-between">
                    <FieldLabel>Data</FieldLabel>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </div>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <IconCalendar className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP", { locale: ro }) : <span>Alege o dată</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange} // Updates the form state
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose className="cursor-pointer text-gray-600 rounded-sm px-4 py-1 border"> 
            Anuleaza
          </DialogClose>
          <Button
            disabled={isCreatingEvent}
            type='submit'
            form='form-new-event'
            // onClick={handleCreateEvent}
            className="cursor-pointer text-white rounded-sm px-4 py-1 border"
          >
            {isCreatingEvent ? (
              <IconLoader2 className="rotate" />
            ) : (
              <span>Creeaza</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddEventDialog