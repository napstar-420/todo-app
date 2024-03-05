import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FaRegCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaCircleCheck } from 'react-icons/fa6';
import { SubtaskSchema } from '@/schemas/sub-task-schema';
import { ZodError } from 'zod';
import { CreateSubtaskDto } from '@/dto';
import { Label } from '@/components//ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SubtasksProps {
  subtasks: CreateSubtaskDto[];
  setSubtasks: Dispatch<SetStateAction<CreateSubtaskDto[]>>;
}

export function CreateSubtask({ subtasks, setSubtasks }: SubtasksProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const validatedData = SubtaskSchema.parse({ title, description });
      setSubtasks([...subtasks, { ...validatedData, completed: false }]);
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.errors[0].message);
        return;
      }

      setError("Couldn't create subtask something went wrong");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='grid gap-2'>
        <Label htmlFor='subtask-title'>Add Subtask</Label>
        <Input
          value={title}
          type='text'
          id='subtask-title'
          autoComplete='off'
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
          maxLength={32}
          required
        />
        <Input
          value={description}
          type='text'
          autoComplete='off'
          placeholder='Description'
          onChange={(e) => setDescription(e.target.value)}
          maxLength={64}
        />
        {error && (
          <small className='text-sm font-medium leading-none text-red-500'>
            {error}
          </small>
        )}
        <Button variant='secondary' className='w-full' size='sm'>
          Add subtask
        </Button>
      </form>
    </div>
  );
}

export function Subtasks({ subtasks, setSubtasks }: SubtasksProps) {
  function toggleComplete(e: React.MouseEvent, i: number) {
    e.preventDefault();
    setSubtasks((prev) => {
      return prev.map((subtask, index) => {
        if (index === i) {
          return { ...subtask, completed: !subtask.completed };
        }

        return subtask;
      });
    });
  }

  function deleteSubtask(index: number) {
    setSubtasks([...subtasks].splice(index, 1));
    console.log(subtasks);
  }

  const DeleteBtn = ({ index }: { index: number }) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size='sm'
            variant='outline'
            className='w-full flex items-center gap-1 mt-2'
          >
            Delete <MdDelete className='text-lg' />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-zinc-950 dark:text-white'>
              Delete subtask?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              subtask.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='text-zinc-950 dark:text-white'>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteSubtask(index)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div>
      <Label>Subtasks</Label>
      {subtasks.length ? (
        <Accordion type='single' collapsible className='w-full'>
          {subtasks.map(({ title, description, completed }, index) => {
            return (
              <AccordionItem key={index} value={`value-${index}`}>
                <AccordionTrigger>
                  <div
                    className='flex items-center gap-2'
                    onClick={(e) => toggleComplete(e, index)}
                  >
                    {completed ? (
                      <FaCircleCheck className='text-lg' />
                    ) : (
                      <FaRegCircle className='text-lg' />
                    )}
                    <span
                      className={`text-zinc-400 capitalize ${
                        completed && 'line-through'
                      }`}
                    >
                      {title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{description}</p>
                  <DeleteBtn index={index} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <p className='text-sm text-zinc-600 text-center py-6'>
          We must break problems down into small, digestible bits.
        </p>
      )}
    </div>
  );
}
