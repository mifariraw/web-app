import dynamic from 'next/dynamic';
import ChangePasswordForm from './ChangePasswordForm';
import { Separator } from '@components/ui/separator';
import Logout from './Logout';
import { EventCategorySection } from './EventCategorySection';
import { cn } from '@lib/utils';

const AddEventDialog = dynamic(() => import('./AddEventDialog'), {
	loading: () => <div className='w-8 h-8' />,
});

const Dashboard = () => {
  return (
    <div className={cn(
      'px-2 py-4',
      'sm:px-4'
    )}>
      <AddEventDialog />
      <Separator className='my-4' />

      <EventCategorySection 
        title='Evenimente'
        type='event'
      />

      <div className='mt-6' />
      <EventCategorySection 
        title='Concerte'
        type='concert'
      />

      <div className='mt-6' />
      <EventCategorySection 
        title='Proiecte Personale'
        type='personal_project'
      />

      <div className='mt-6' />
      <EventCategorySection 
        title='Portrete'
        type='portraits'
      />

      <Separator className='my-4' />
      <ChangePasswordForm />

      <Separator className='my-4' />
      <div className='flex justify-end'>
        <Logout />
      </div>
    </div>
  )
}

export default Dashboard