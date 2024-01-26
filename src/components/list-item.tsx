import { IconType } from 'react-icons';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

interface ListItemProps {
  name: string;
  href: string;
  tasksCount?: number;
  Icon?: IconType;
  key?: number | string;
  addContextMenu?: boolean;
}

export default function ListItem({
  name,
  tasksCount,
  Icon,
  href,
  key,
  addContextMenu,
}: ListItemProps) {
  const location = useLocation();

  const NavItemLink = () => (
    <Button
      asChild
      variant={location.pathname === href ? 'default' : 'ghost'}
      className='gap-4 w-full'
    >
      <NavLink key={key} to={href}>
        {Icon && <Icon className='h-4 w-4' />}
        <h4 className='text-sm font-medium'>{name}</h4>
        <span className='flex-1' />
        {tasksCount !== null && tasksCount !== undefined && (
          <Badge variant='secondary'>{tasksCount}</Badge>
        )}
      </NavLink>
    </Button>
  );

  if (!addContextMenu) {
    return <NavItemLink />;
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <NavItemLink />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className='cursor-pointer flex gap-2'>
          <FaEdit />
          Update
        </ContextMenuItem>
        <ContextMenuItem className='cursor-pointer flex gap-2'>
          <MdDelete />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
