import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoMdAdd } from 'react-icons/io';

export function CreateList() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full'>
          <IoMdAdd className='h-4 w-4' /> Create List
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>Create new list</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4 dark:text-white'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='list-name' className='text-right'>
              List name
            </Label>
            <Input id='list-name' value='' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='list-color' className='text-right'>
              List color
            </Label>
            <Input id='list-color' value='' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
