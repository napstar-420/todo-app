import { IconType } from 'react-icons';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { useAxiosPrivate } from '@/hooks/use-axios-private';
import routes from '@/api/routes';
import appRoutes from '@/config/app-routes';
import { useList } from '@/hooks/use-lists';
import UpdateList from './update-list';

interface ListItemProps {
  _id: string;
  name: string;
  href: string;
  color: string;
  tasksCount?: number;
  Icon?: IconType;
  addContextMenu?: boolean;
}

export default function ListItem({
  _id,
  name,
  color,
  tasksCount,
  Icon,
  href,
  addContextMenu,
}: ListItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const { setLists } = useList();
  const { listID } = useParams();

  const deleteList = async () => {
    await axios.delete(`${routes.LISTS}/${_id}`);
    if (listID && listID === _id) {
      navigate(appRoutes.ROOT);
    }
    setLists((prev) => prev.filter((list) => list._id !== _id));
    toast(`${name} delete successfully`);
  };

  const NavItemLink = () => (
    <Button
      asChild
      variant={location.pathname === href ? 'default' : 'ghost'}
      className='gap-4 w-full'
    >
      <NavLink to={href}>
        {Icon && <Icon className='h-4 w-4' />}
        {color && (
          <div className='h-4 w-4 rounded' style={{ backgroundColor: color }} />
        )}
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
        <ContextMenuItem className='' asChild>
          <UpdateList name={name} color={color} _id={_id}>
            <>
              <FaEdit />
              Update
            </>
          </UpdateList>
        </ContextMenuItem>
        <ContextMenuItem
          className='cursor-pointer flex gap-2'
          onClick={deleteList}
        >
          <MdDelete />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
