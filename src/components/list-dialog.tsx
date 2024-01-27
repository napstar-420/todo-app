import { ReactNode, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { FormError } from '@/types';
import { ListSchema } from '@/schemas/list-schema';
import ErrorAlert from './error-alert';

interface ListDialogProps {
  title: string;
  initialName: string;
  initialColor: string;
  onSave: (name: string, color: string) => Promise<void>;
  children: ReactNode | undefined;
}

export default function ListDialog({
  title,
  initialName,
  initialColor,
  onSave,
  children,
}: ListDialogProps) {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);
  const [error, setError] = useState<FormError | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const newList = { name, color };
      const validatedData = ListSchema.parse(newList);
      await onSave(validatedData.name, validatedData.color);
      setDialogOpen(false);
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

  useEffect(() => {
    if (dialogOpen) {
      setName(initialName);
      setColor(initialColor);
    }
  }, [dialogOpen]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>{title}</DialogTitle>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className='col-span-2'
            />
            <Input
              type='color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit} disabled={loading}>
            {loading ? 'Please wait' : 'Create List'}
            {loading && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
