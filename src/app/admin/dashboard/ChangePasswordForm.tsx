"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@src/components/ui/field"
import { Input } from "@src/components/ui/input"
import { Button } from '@src/components/ui/button'
import { IconLoader2 } from '@tabler/icons-react'
import { changePassword } from '@src/lib/admin'

export const formSchema = z.object({
  oldPassword: z.string().min(6, "Parola veche este obligatorie"),
  newPassword: z.string().min(6, "Parola nouă este obligatorie"),
  confirmNewPassword: z
    .string()
    .min(6, "Confirmarea parolei este obligatorie")
}).refine(
  (data) => data.newPassword === data.confirmNewPassword, 
  {
    message: "Parolele noi nu se potrivesc",
  }
)

const ChangePasswordForm = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsChangingPassword(true)

    changePassword(data.oldPassword, data.newPassword)
      .finally(() => {
        setIsChangingPassword(false)
        form.reset()
      })
  }

  return (
    <div>
      <form id="form-change-password" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className='flex-center gap-2'>
            <Controller
              name="oldPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='flex-1/2'>
                  <div className="flex-center-between">
                    <FieldLabel htmlFor="form-oldPassword">
                      Parola veche
                    </FieldLabel>
                  </div>
                  <Input
                    {...field}
                    type='password'
                    id="form-oldPassword"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='flex-1/2'>
                  <div className="flex-center-between">
                    <FieldLabel htmlFor="form-newPassword">
                      Parola nouă
                    </FieldLabel>
                  </div>
                  <Input
                    {...field}
                    id="form-newPassword"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                </Field>
              )}
            />
          </div>
          <div className='flex items-end gap-2'>
            <Controller
              name="confirmNewPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='flex-1/2'>
                  <div className="flex-center-between">
                    <FieldLabel htmlFor="form-confirmNewPassword">
                      Confirmara Parola
                    </FieldLabel>
                  </div>
                  <Input
                    {...field}
                    id="form-confirmNewPassword"
                    type="password"
                    className='flex-1/2'
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                </Field>
              )}
            />
            <Button 
              type="submit" 
              className="flex-1/2"
              form='form-change-password'
            >
              {isChangingPassword ? (
                <IconLoader2 className='rotate' />
              ) : (
                "Schimbă Parola"
              )}
              
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}

export default ChangePasswordForm