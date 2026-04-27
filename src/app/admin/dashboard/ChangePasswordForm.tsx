'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@components/ui/field'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { IconLoader2 } from '@tabler/icons-react'
import { changePassword } from '@lib/admin'
import { cn } from '@lib/utils'
import { toast } from 'sonner'

export const formSchema = z.object({
  oldPassword: z.string().min(6, 'Parola veche este obligatorie'),
  newPassword: z.string().min(6, 'Parola nouă este obligatorie'),
  confirmNewPassword: z
    .string()
    .min(6, 'Confirmarea parolei este obligatorie')
}).refine(
  (data) => data.newPassword === data.confirmNewPassword, 
  {
    message: 'Parolele noi nu se potrivesc',
  }
)

const ChangePasswordForm = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsChangingPassword(true)
    try {
      await changePassword(data.oldPassword, data.newPassword)
      toast.success('Parola a fost schimbata')
      form.reset()
    } catch {
      toast.error('Eroare')
    }

    setIsChangingPassword(false)
  }

  return (
    <div>
      <h2 className={cn(
        'text-lg font-semibold mb-2',
        'xl:text-2xl'
      )}>Schimba Parola</h2>
      <form 
        id='form-change-password' 
        className={cn(
          'xl:flex'
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup
          className={cn(
            'xl:flex xl:flex-row'
          )}
        >
          <div className={cn(
            'flex-center gap-2',
            'xl:flex-1/2'
          )}>
            <Controller
              name='oldPassword'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='flex-1/2'>
                    <FieldLabel 
                      htmlFor='form-oldPassword'
                      className={cn(
                        'xl:text-xl'
                      )}
                    >
                      Parola veche
                    </FieldLabel>
                  <Input
                    {...field}
                    type='password'
                    id='form-oldPassword'
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
            <Controller
              name='newPassword'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='flex-1/2'>
                  <FieldLabel 
                    htmlFor='form-newPassword'
                    className={cn(
                      'xl:text-xl'
                    )}
                  >
                    Parola nouă
                  </FieldLabel>
                  <Input
                    {...field}
                    id='form-newPassword'
                    type='password'
                    aria-invalid={fieldState.invalid}
                    autoComplete='off'
                  />
                </Field>
              )}
            />
          </div>
          <div className={cn(
            'flex items-end gap-2',
            'xl:flex-1/2'
          )}>
            <Controller
              name='confirmNewPassword'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='flex-1/2'>
                  <FieldLabel 
                    htmlFor='form-confirmNewPassword'
                    className={cn(
                      'xl:text-xl'
                    )}
                  >
                    Confirmara Parola
                  </FieldLabel>
                  <Input
                    {...field}
                    id='form-confirmNewPassword'
                    type='password'
                    className='flex-1/2'
                    aria-invalid={fieldState.invalid}
                    autoComplete='off'
                  />
                </Field>
              )}
            />
            <Button 
              type='submit' 
              className={cn(
                'flex-1/2'
              )}
              disabled={isChangingPassword || !form.formState.isDirty}
              form='form-change-password'
            >
              {isChangingPassword ? (
                <IconLoader2 className='rotate' />
              ) : (
                'Schimbă Parola'
              )}
              
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}

export default ChangePasswordForm