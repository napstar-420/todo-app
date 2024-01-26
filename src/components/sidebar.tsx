import { FaSignOutAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { MdDoubleArrow } from 'react-icons/md';
import { FaListCheck, FaNoteSticky } from 'react-icons/fa6';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreateList } from './create-list';
import { Input } from './ui/input';
import ListItem from './list-item';
import { useState } from 'react';
import TagItem from './tag-item';
import appRoutes from '@/config/app-routes';

interface DefaultList {
  Icon: IconType;
  name: string;
  tasksCount?: number;
  href: string;
}

interface List {
  id: string;
  name: string;
  color: string;
  tasksCount: number;
}

interface Tag {
  id: string;
  name: string;
}

const defaultLists: DefaultList[] = [
  {
    Icon: MdDoubleArrow,
    name: 'Upcoming',
    tasksCount: 24,
    href: appRoutes.UP_COMING,
  },
  {
    Icon: FaListCheck,
    name: 'Today',
    tasksCount: 24,
    href: appRoutes.ROOT,
  },
  {
    Icon: FaRegCalendarAlt,
    name: 'Calendar',
    href: appRoutes.CALENDAR,
  },
  {
    Icon: FaNoteSticky,
    name: 'Sticky wall',
    href: appRoutes.STICKY_WALL,
  },
];

export default function Sidebar() {
  const [lists, setLists] = useState<List[]>([
    { id: '123', name: 'Home', color: '111', tasksCount: 10 },
    { id: '234', name: 'Work', color: '111', tasksCount: 5 },
    { id: '222', name: 'Outside', color: '111', tasksCount: 9 },
    { id: '69', name: 'Hobbies', color: '111', tasksCount: 100 },
  ]);

  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'Tag1' },
    { id: '2', name: 'Tag2' },
    { id: '3', name: 'Tag3' },
    { id: '4', name: 'Tag4' },
    { id: '5', name: 'Tag5' },
    { id: '6', name: 'Tag5' },
    { id: '7', name: 'Tag5' },
    { id: '8', name: 'Tag5' },
    { id: '9', name: 'Tag5' },
    { id: '10', name: 'Tag5' },
  ]);

  return (
    <div className='w-80 py-4 px-2 border-r-2 dark:border-r-zinc-800 grid grid-rows-[auto_1fr_auto]'>
      <Input type='text' placeholder='Search' />
      <div className='flex flex-col gap-4 my-4'>
        <div>
          <small className='text-xs font-semibold leading-none px-2'>
            TASKS
          </small>
          <div className='grid mt-2'>
            {defaultLists.map(({ Icon, name, href, tasksCount }, index) => (
              <ListItem
                name={name}
                Icon={Icon}
                href={href}
                tasksCount={tasksCount}
                key={index}
              />
            ))}
          </div>
        </div>
        <div>
          <small className='text-xs font-semibold leading-none px-2'>
            LISTS
          </small>
          <div className='grid my-2'>
            {lists.map(({ id, name, tasksCount }, index) => (
              <ListItem
                name={name}
                Icon={FaListCheck}
                href={appRoutes.LIST(id)}
                tasksCount={tasksCount}
                key={index}
                addContextMenu={true}
              />
            ))}
          </div>
          <CreateList />
        </div>
        <div>
          <small className='text-xs font-semibold leading-none px-2'>
            TAGS
          </small>
          <div className='mt-2 flex flex-wrap gap-2 px-2 py-2'>
            {tags.map(({ id, name }, index) => (
              <TagItem name={name} key={index} href={appRoutes.TAG(id)} />
            ))}
          </div>
        </div>
      </div>
      <footer>
        <Button asChild variant='outline' className='w-full'>
          <NavLink to={'/logout'}>
            <FaSignOutAlt className='mr-2 h-4 w-4 rotate-180' />
            Sign out
          </NavLink>
        </Button>
      </footer>
    </div>
  );
}
