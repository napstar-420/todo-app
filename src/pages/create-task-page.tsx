import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { IoMdClose } from 'react-icons/io';

export default function CreateTask() {
  return (
    <div className='bg-theme-primary w-full h-full'>
      <header className='border-b-2 dark:border-b-zinc-800 px-4 py-3 flex items-center justify-between'>
        <h4 className='scroll-m-20 text-xl font-bold tracking-wide'>
          Create new task
        </h4>
        <Button variant='outline' size='icon'>
          <IoMdClose className='h-4 w-4' />
        </Button>
      </header>
      <main>
        <form className='px-4 py-4 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='title'>Task title</Label>
            <Input id='title' type='text' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='description'>Task description</Label>
            <Textarea id='description' rows={5} />
          </div>
        </form>
      </main>
    </div>
  );
}
