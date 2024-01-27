import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { z, ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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
import { useAxiosPrivate } from '@/hooks/use-axios-private';
import { isValidHexColor } from '@/helpers';
import { toast } from 'sonner';
import ErrorAlert from '@/components/error-alert';
import { FormError } from '@/types';
import routes from '@/api/routes';
import appRoutes from '@/config/app-routes';
import { useList } from '@/hooks/use-lists';
import { AxiosError } from 'axios';
import { List } from '@/context/list-provider';

const ListSchema = z.object({
  listName: z.string().min(1).max(64),
  listColor: z.string().refine((value) => isValidHexColor(value), {
    message: 'Invalid hex color format',
  }),
});

const defaultColor = '#22d3ee';

export function CreateList() {
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const { setLists } = useList();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [listName, setListName] = useState('');
  const [listColor, setListColor] = useState(defaultColor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FormError | null>(null);

  const createList = async () => {
    setLoading(true);

    try {
      const newList = { listName, listColor };
      const validatedList = ListSchema.parse(newList);
      const payload = {
        name: validatedList.listName,
        color: validatedList.listColor,
      };

      const response = await axios.post(routes.LISTS, payload);
      const data = response.data as List;

      setLists((prev) => [...prev, data]);
      setDialogOpen(false);
      setListName('');
      setListColor(defaultColor);
      navigate(appRoutes.LIST(data._id));
      toast(`List ${validatedList.listName} has been created successfully`);
    } catch (error) {
      if (error instanceof ZodError) {
        for (const zodError of error.errors) {
          setError({
            message: zodError.message,
            title: 'Incorrect field',
          });
        }

        return;
      }

      if (error instanceof AxiosError) {
        if (error?.response?.status === 409) {
          setError({
            message: 'A list with same name already exists',
            title: 'Duplicate list',
          });

          return;
        }
      }

      setError({
        title: 'Incorrect Fields',
        message: 'Please make sure all your fields are correct',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen} modal={loading}>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full'>
          <IoMdAdd className='h-4 w-4' /> Create List
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]' onSubmit={createList}>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>Create new list</DialogTitle>
          {error && (
            <div className='pt-4'>
              <ErrorAlert {...error} />
            </div>
          )}
        </DialogHeader>
        <div className='grid gap-4 py-4 dark:text-white'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='list-name' className='text-right'>
              List name
            </Label>
            <Input
              required
              id='list-name'
              type='text'
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='list-color' className='text-right'>
              List color
            </Label>
            <Input
              required
              id='list-color'
              type='text'
              value={listColor}
              onChange={(e) => setListColor(e.target.value)}
              className='col-span-2'
            />
            <Input
              type='color'
              value={listColor}
              onChange={(e) => setListColor(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={createList} disabled={loading}>
            {loading ? 'Please wait' : 'Create List'}
            {loading && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
