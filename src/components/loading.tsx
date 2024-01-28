import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='grid place-items-center'>
      <p className='leading-7 text-lg [&:not(:first-child)]:mt-6 flex items-center gap-2'>
        <Loader2 className='h-6 w-6 animate-spin' />
        Loading...
      </p>
    </div>
  );
}
