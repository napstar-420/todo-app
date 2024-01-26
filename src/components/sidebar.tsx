import { FaSearch, FaSignOutAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { MdDoubleArrow } from 'react-icons/md';
import { FaListCheck, FaNoteSticky } from 'react-icons/fa6';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreateList } from './create-list';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface DefaultList {
  Icon: IconType;
  name: string;
  count?: number;
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

export default function Sidebar() {
  return (
    <div className='w-80 py-4 px-2 border-r-2 grid grid-rows-[auto_1fr_auto]'>
      <Input type='text' placeholder='Search' />
      <div>
        <DefaultLists />
        <Lists />
        <Tags />
      </div>
      <Footer />
    </div>
  );
}

function DefaultLists() {
  const lists: DefaultList[] = [
    {
      Icon: MdDoubleArrow,
      name: 'Upcoming',
      count: 24,
      href: '/upcoming',
    },
    {
      Icon: FaListCheck,
      name: 'Today',
      count: 24,
      href: '/',
    },
    {
      Icon: FaRegCalendarAlt,
      name: 'Calendar',
      href: '/calendar',
    },
    {
      Icon: FaNoteSticky,
      name: 'Sticky wall',
      href: '/sticky-wall',
    },
  ];

  return (
    <div className='my-4'>
      <small className='text-xs font-semibold leading-none px-2'>TASKS</small>
      <div className='grid mt-2'>
        {lists.map(({ Icon, name, href, count }, index) => {
          return (
            <Button asChild variant='ghost'>
              <NavLink key={index} to={href} className='gap-2'>
                <Icon className='h-4 w-4' />
                <h4 className='text-sm font-medium'>{name}</h4>
                <span className='flex-1' />
                {count && <Badge variant='default'>{count}</Badge>}
              </NavLink>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

function Lists() {
  const lists: List[] = [
    { id: '123', name: 'Home', color: '111', tasksCount: 10 },
    { id: '234', name: 'Work', color: '111', tasksCount: 5 },
    { id: '222', name: 'Outside', color: '111', tasksCount: 9 },
    { id: '69', name: 'Hobbies', color: '111', tasksCount: 100 },
  ];

  return (
    <div className='my-4'>
      <small className='text-xs font-semibold leading-none px-2'>LISTS</small>
      <div className='grid my-2'>
        {lists.map(({ id, name, tasksCount }, index) => {
          return (
            <Button asChild variant='ghost'>
              <NavLink key={index} to={`/lists/${id}`} className='gap-2'>
                <FaListCheck className='h-4 w-4' />
                <h4 className='text-sm font-medium'>{name}</h4>
                <span className='flex-1' />
                {tasksCount && <Badge variant='default'>{tasksCount}</Badge>}
              </NavLink>
            </Button>
          );
        })}
      </div>
      <CreateList />
    </div>
  );
}

function Tags() {
  const tags: Tag[] = [
    { id: '1', name: 'Tag1' },
    { id: '2', name: 'Tag2' },
    { id: '3', name: 'Tag3' },
    { id: '4', name: 'Tag4' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
    { id: '5', name: 'Tag5' },
  ];

  const colors = [
    '#fee2e2',
    '#dcfce7',
    '#dbeafe',
    '#cffafe',
    '#fef3c7',
    '#ecfccb',
    '#fae8ff',
    '#ffedd5',
  ];

  return (
    <div className='my-4'>
      <small className='text-xs font-semibold leading-none px-2'>TAGS</small>
      <div className='mt-2 flex flex-wrap gap-2 px-2 py-2'>
        {tags.map(({ id, name }, index) => (
          <NavLink
            to={`tags/${id}`}
            key={index}
            className={`px-2 py-1 font-medium rounded-sm text-xs bg-opacity-50`}
            style={{ backgroundColor: colors[index % colors.length] }}
          >
            {name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <Button asChild variant='outline' className='w-full'>
        <NavLink to={'/logout'}>
          <FaSignOutAlt className='mr-2 h-4 w-4 rotate-180' />
          Sign out
        </NavLink>
      </Button>
    </footer>
  );
}
