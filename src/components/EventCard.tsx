import { cn } from '@lib/utils'
import { IEvent } from '@src/models/interfaces'
import Image from 'next/image'
import Link from 'next/link'

interface EventCardProps {
  event: IEvent,
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link 
      className='flex flex-col w-fit shrink-0 items-center gap-2'
      href={'/admin/event/' + event?._id.toString()}
    >
      <Image
        src={event.coverImageUrl} 
        width={120}
        height={120}
        className={cn(
          'w-30 aspect-square rounded-md',
          'sm:w-40',
          'xl:w-60'
        )}
        alt={event.title}
      />
      <span className={cn(
        'font-semibold',
        'xl:text-xl'
      )}>{event.title}</span>
    </Link>
  )
}

export default EventCard