import GlitchText from '@components/GlitchText'
import Link from 'next/link'
import { IconHome2 } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { cn } from '@src/lib/utils'

const NotFound = () => {
  const t = useTranslations('NotFound')

  return (
    <div className='w-full h-screen flex-center flex-col justify-center'>
      <GlitchText
        speed={1.2}
        enableShadows
        enableOnHover={false}
        className={cn(
          'custom-class scale-200 mb-8',
          'sm:scale-200',
          'md:scale-150'
        )}
      >
        404
      </GlitchText>
      <span className='nohemi text-white text-3xl text-center'>
        {t('pageNotExisting')}
      </span>
    
      <Link href='/' className='flex-center gap-2 text-white mt-16'>
        <IconHome2 />
        {t('homeLink')}
      </Link>
    </div>
  )
}

export default NotFound