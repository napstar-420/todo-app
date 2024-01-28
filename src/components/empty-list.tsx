import messages from '@/lib/messages';

interface EmptyListProps {
  message?: string;
}

export default function EmptyList({ message }: EmptyListProps) {
  return (
    <div className='h-full grid place-items-center px-4'>
      <p className='leading-7 [&:not(:first-child)]:mt-6 text-center dark:text-zinc-500 '>
        {message ? message : messages.emptyList}
      </p>
    </div>
  );
}
