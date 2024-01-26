import { NavLink } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { CreateList } from './create-list';
import { Input } from './ui/input';
import { useList } from '@/hooks/use-lists';
import ListItem from './list-item';
import TagItem from './tag-item';
import appRoutes from '@/config/app-routes';
import { useTag } from '@/hooks/use-tag';

export default function Sidebar() {
  const { lists, defaultLists } = useList();
  const { tags } = useTag();

  return (
    <div className='w-80 py-4 px-2 border-r-2 dark:border-r-zinc-800 grid grid-rows-[auto_1fr_auto]'>
      <Input type='text' placeholder='Search' />
      <div className='flex flex-col gap-4 my-4'>
        <div>
          <small className='text-xs font-semibold leading-none px-2'>
            TASKS
          </small>
          <div className='grid mt-2'>
            {defaultLists.map((list) => (
              <ListItem key={list.id} {...list} />
            ))}
          </div>
        </div>
        <div>
          <small className='text-xs font-semibold leading-none px-2'>
            LISTS
          </small>
          <div className='grid my-2'>
            {lists.map((list) => (
              <ListItem
                {...list}
                Icon={FaListCheck}
                href={appRoutes.LIST(list.id)}
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
            {tags.map((tag) => (
              <TagItem {...tag} key={tag.id} href={appRoutes.TAG(tag.id)} />
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
