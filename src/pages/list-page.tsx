import { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useAxiosPrivate } from '@/hooks/use-axios-private';
import routes from '@/api/routes';
import { List, Subtask, Task } from '@/dto';
import NotFound from '@/components/not-found';
import Loading from '@/components/loading';
import OpenTaskPage from '@/components/open-task-page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmptyList from '@/components/empty-list';
import messages from '@/lib/messages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ListTask from '@/components/list-task';

const dummyList: List = {
  _id: '123',
  color: '#222',
  createdAt: '2024-01-27T01:16:34.700Z',
  name: 'List A',
  tasks: [],
};

const dummySubtasks: Subtask[] = [];

const dummyTasks: Task[] = [
  {
    _id: '1',
    title: 'Task title',
    description: 'Task description',
    dueDate: '2024-02-27T01:16:34.700Z',
    tags: ['tag1', 'tag2', 'tag3'],
    completed: false,
    completedAt: '024-01-24T18:41:22.287+00:00',
    list: dummyList,
    subtasks: dummySubtasks,
    subtasksCount: 10,
  },
  {
    _id: '1',
    title: 'Task title',
    description: 'Task description',
    dueDate: '2024-02-27T01:16:34.700Z',
    tags: ['tag1', 'tag2', 'tag3'],
    completed: false,
    completedAt: '024-01-24T18:41:22.287+00:00',
    list: dummyList,
    subtasks: dummySubtasks,
    subtasksCount: 10,
  },
  {
    _id: '1',
    title: 'Task title',
    description: 'Task description',
    dueDate: '2024-02-27T01:16:34.700Z',
    tags: ['tag1', 'tag2', 'tag3'],
    completed: false,
    completedAt: '024-01-24T18:41:22.287+00:00',
    list: dummyList,
    subtasks: dummySubtasks,
    subtasksCount: 10,
  },
  {
    _id: '1',
    title: 'Task title',
    description: 'Task description',
    dueDate: '2024-02-27T01:16:34.700Z',
    tags: ['tag1', 'tag2', 'tag3'],
    completed: false,
    completedAt: '024-01-24T18:41:22.287+00:00',
    list: dummyList,
    subtasks: dummySubtasks,
    subtasksCount: 10,
  },
];

export default function ListPage() {
  const axios = useAxiosPrivate();
  const { listID } = useParams();
  const [list, setList] = useState<List | null>(null);
  const [loading, setLoading] = useState(true);

  const inprogressTasks = list
    ? list.tasks.filter((task) => task.completed === false)
    : [];
  const completedTasks = list
    ? list.tasks.filter((task) => task.completed === true)
    : [];

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const getTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${routes.LISTS}/${listID}`, {
          signal: controller.signal,
        });

        if (isMounted) {
          setList({ ...response.data, tasks: dummyTasks });
        }
      } catch (error) {
        throw new Error();
      } finally {
        setLoading(false);
      }
    };

    getTasks();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [listID]);

  if (loading) {
    return <Loading />;
  }

  if (!list) {
    return <NotFound />;
  }

  return (
    <div className='grid grid-cols-[1fr_auto]'>
      <div className='border-r-2 dark:border-r-zinc-800 grid grid-rows-1'>
        <Tabs
          defaultValue='in-progress'
          className='grid grid-rows-[auto_auto_1fr] '
        >
          <div className='border-b-2 dark:border-b-zinc-800 flex items-center px-4 py-3 justify-between'>
            <h4 className='scroll-m-20 text-xl font-bold tracking-wide'>
              {list.name}
            </h4>
            <TabsList>
              <TabsTrigger value='in-progress'>In progress</TabsTrigger>
              <TabsTrigger value='completed'>Completed</TabsTrigger>
            </TabsList>
          </div>
          <div className='px-4 pt-4 pb-2 flex gap-3 items-center'>
            <Input id='filter-tasks' placeholder='Search' />
            <Button variant='secondary' asChild>
              <NavLink to='new'>New task</NavLink>
            </Button>
          </div>
          <TabsContent value='in-progress' className='px-4 flex flex-col gap-4'>
            {inprogressTasks.length ? (
              inprogressTasks.map((task) => {
                return <ListTask key={task._id} task={task} />;
              })
            ) : (
              <EmptyList />
            )}
          </TabsContent>
          <TabsContent value='completed'>
            {completedTasks.length ? (
              inprogressTasks.map((task, index) => {
                return <div key={index}>{task.title}</div>;
              })
            ) : (
              <EmptyList message={messages.completedListEmpty} />
            )}
          </TabsContent>
        </Tabs>
      </div>
      <div className='relative grid place-items-center'>
        <OpenTaskPage />
        <div className='absolute w-full h-full top-0 left-0'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
