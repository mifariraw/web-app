'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@components/ui/field'
import { Input } from '@components/ui/input'
import { useEffect, useState } from 'react'
import { IconLoader2 } from '@tabler/icons-react'
import { loginAdmin } from '@lib/admin'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@lib/utils'

export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email(t('email.invalid')),
    password: z
      .string()
      .min(6, t('password.min'))
      .max(100, t('password.max'))
  });

export function LoginForm() {
  const searchParams = useSearchParams()
  const expired = searchParams.get('expired')

  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)
  const t = useTranslations('Login');
  const toastT = useTranslations('Common')
  const formSchema = createFormSchema(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoggingIn(true)

    try {
      await loginAdmin(data.email, data.password)
      toast.success(toastT('success.login'));
      router.replace('/admin/dashboard')
    } catch (error) {
      toast.success(toastT('errors.login'));
    }

    setIsLoggingIn(false)
  }

  useEffect(() => {
    if (expired === 'true') {
      toast.error('Sesiunea a expirat')
      
      window.history.replaceState({}, '', '/login')
    }
  }, [expired])

  return (
    <Card className='w-full sm:max-w-md z-10'>
      <CardHeader>
        <CardTitle className={cn(
          'text-2xl font-semibold flex items-center justify-between',
          'xl:text-3xl'
        )}>
          Log In
        </CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id='form-login' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className='flex-center-between'>
                    <FieldLabel htmlFor='form-email' className={cn(
                      'text-[#5227FF]!',
                      'xl:text-lg'
                    )}>
                      Email
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <Input
                    {...field}
                    id='form-email'
                    aria-invalid={fieldState.invalid}
                    className='xl:text-lg'
                  />
                </Field>
              )}
            />
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className='flex-center-between'>
                    <FieldLabel htmlFor='form-password' className={cn(
                      'text-[#5227FF]!',
                      'xl:text-lg'
                    )}>
                      Password
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <Input
                    {...field}
                    id='form-password'
                    type='password'
                    aria-invalid={fieldState.invalid}
                    autoComplete='off'
                    className='xl:text-lg'
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className='mt-8'>
        <Field orientation='horizontal' className='flex items-center'>
          <Button 
            type='button' 
            variant='outline' 
            onClick={() => form.reset()}
            className={cn('flex-1/4', 'xl:text-xl, xl:py-4!')}
          >
            {t('reset')}
          </Button>
          <Button 
            type='submit' 
            disabled={isLoggingIn || !form.formState.isDirty}
            form='form-login'
            className={cn(
              'flex-3/4 bg-[#5227FF] text-white hover:bg-main-accent/90',
              'xl:text-xl xl:py-4!'
            )}
          >
            {isLoggingIn ? (
              <IconLoader2 className='rotate' size={20} />
            ) : (
              'Login'
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}