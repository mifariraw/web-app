"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@src/components/ui/field"
import { Input } from "@src/components/ui/input"
import { Button } from '@src/components/ui/button'
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconLoader2 } from '@tabler/icons-react'
import { Textarea } from '@src/components/ui/textarea'
import { Separator } from '@src/components/ui/separator'
import { useForm as useFormSpree } from '@formspree/react';
import Link from 'next/link'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email(t("email.invalid")),
    text: z
      .string()
      .min(6, t("text.min"))
      .max(500, t("text.max"))
  });

const ContactPage = () => {
  const [state, handleSubmit] = useFormSpree("xlgannvw");
  const [isSending, setIsSending] = useState<boolean>(false)
  const t = useTranslations('ContactForm');
  const formSchema = createFormSchema(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      text: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSending(true)

    handleSubmit(data)
      .finally(() => {
        setIsSending(false)
        toast.success('Mesaj trimis')
        form.reset()
      })
  }

  return (
    <div className='px-6 pt-24 h-full z-10'>
      <div className='flex items-center gap-1 text-white mb-14 mt-6'>
        <h1 className='nohemi lowercase! text-4xl text-right w-full'>contact</h1>
        <Separator className='w-8! border-2 border-secondary' />
      </div>

      <form id="form-contact" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex-center-between">
                  <FieldLabel htmlFor="form-email" className="text-white! text-xl">
                    Email
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
                <Input
                  {...field}
                  id="form-email"
                  aria-invalid={fieldState.invalid}
                  className='rounded-none! border-0 border-b border-b-white text-white text-xl'
                />
              </Field>
            )}
          />
          <Controller
            name="text"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex-center-between">
                  <FieldLabel htmlFor="form-text" className="text-white! text-xl">
                    {t('message')}
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
                <Textarea
                  {...field}
                  id="form-text"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  className='rounded-none! border-0 border-b border-b-white text-white text-xl h-30 max-h-30 resize-none overflow-y-scroll'
                />
              </Field>
            )}
          />
        </FieldGroup>
        <Field orientation="horizontal" className="flex items-center mt-8">
          <Button 
            type="submit" 
            disabled={isSending || !form.formState.isDirty}
            form="form-contact"
            className="w-full rounded-none bg-white hover:bg-white/90 text-whtie hover:text-white"
          >
            {isSending ? (
              <IconLoader2 className="rotate" size={20} />
            ) : (
              t('sendMessage')
            )}
          </Button>
        </Field>
      </form>

      <div className='flex flex-col gap-4 mt-18 '>
        <div className='flex items-center gap-4'>
          <Separator className='w-18! border-2 border-secondary' />
          <Link
            href={"https://www.instagram.com/mifari.raw"}
            target='_blank'
          >
            <IconBrandInstagram size={32} className='hover:scale-120 transition-all duration-150 ease text-white' />
          </Link>
        </div>
        <div className='flex items-center gap-4 z-10'>
          <Separator className='w-12! border-2 border-secondary' />
          <Link
            href={"https://www.facebook.com/profile.php?id=61575728319624"}
            target='_blank'
          >
            <IconBrandFacebook size={32} className='hover:scale-120 transition-all duration-150 ease text-white' />
          </Link>
          <Separator className='w-12! border-2 border-secondary' />
          <Link
            href={"https://www.tiktok.com/@mifari.raw"}
            target='_blank'
          >
            <IconBrandTiktok size={32} className='hover:scale-120 transition-all duration-150 ease text-white' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ContactPage