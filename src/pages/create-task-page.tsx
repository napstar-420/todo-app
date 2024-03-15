import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';
import { Label } from '@radix-ui/react-label';
import { IoMdClose } from 'react-icons/io';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { TagsSelect } from '@/components/tags-select';
import { CreateSubtask, Subtasks } from '@/components/create-subtask';

import { CreateSubtaskDto, CreateTaskDto, Task } from '@/dto';
import { TaskSchema } from '@/schemas/task-schema';
import { useAxiosPrivate } from '@/hooks/use-axios-private';
import routes from '@/api/routes';

export default function CreateTask() {
  const params = useParams();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [subtasks, setSubtasks] = useState<CreateSubtaskDto[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function saveTask() {
    // Validation
    try {
      TaskSchema.parse({ title, description });
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.errors[0].message);
        return;
      }

      setError('Something went wrong');
      return;
    }

    // API call
    try {
      setLoading(true);
      const payload: CreateTaskDto = {
        title,
        description,
        tags,
        subtasks,
        completed: false,
        listID: params.listID as string,
        dueDate: new Date().toISOString(),
      };

      const response = await axios.post(routes.TASKS, payload);
      const task = response.data as Task;
      navigate(`/${params.listID}/${task._id}`);
      setTitle('');
      setDescription('');
      setTags([]);
      setSubtasks([]);
    } catch (error) {
      setError("Something went wrong, couldn't create task");
    } finally {
      setLoading(false);
    }
  }

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
      <main className='px-4 py-4 flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='title'>Task title</Label>
          <Input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='description'>Task description</Label>
          <Textarea
            id='description'
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <TagsSelect tags={tags} setTags={setTags} />
        <CreateSubtask subtasks={subtasks} setSubtasks={setSubtasks} />
        <Subtasks subtasks={subtasks} setSubtasks={setSubtasks} />
        {error && (
          <small className='text-sm font-medium leading-none text-red-500'>
            {error}
          </small>
        )}
        <Button
          variant='default'
          className='w-full'
          onClick={saveTask}
          disabled={loading}
        >
          Add task
        </Button>
      </main>
    </div>
  );
}
