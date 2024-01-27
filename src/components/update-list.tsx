import { ReactNode, forwardRef } from 'react';
import { useAxiosPrivate } from '@/hooks/use-axios-private';
import { toast } from 'sonner';
import routes from '@/api/routes';
import { useList } from '@/hooks/use-lists';
import ListDialog from './list-dialog';

interface UpdateListProps {
  _id: string;
  name: string;
  color: string;
  children: ReactNode;
}

const UpdateList = forwardRef<HTMLDivElement, UpdateListProps>((props, ref) => {
  const { _id, color, name, children } = props;
  const axios = useAxiosPrivate();
  const { updateLists } = useList();

  const updateList = async (name: string, color: string) => {
    const payload = { name, color };
    await axios.patch(`${routes.LISTS}/${_id}`, payload);
    await updateLists();
    toast(`${name} has been updated successfully`);
  };

  return (
    <ListDialog
      title='Update List'
      initialName={name}
      initialColor={color}
      onSave={updateList}
    >
      <div
        ref={ref}
        className='cursor-pointer "relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50'
      >
        {children}
      </div>
    </ListDialog>
  );
});

export default UpdateList;
