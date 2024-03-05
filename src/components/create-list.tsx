import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAxiosPrivate } from '@/hooks/use-axios-private';
import { toast } from 'sonner';
import { List } from '@/dto';
import { useList } from '@/hooks/use-lists';
import routes from '@/api/routes';
import appRoutes from '@/config/app-routes';
import ListDialog from './list-dialog';
import config from '@/config';

export function CreateList() {
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const { updateLists } = useList();

  const createList = async (name: string, color: string) => {
    const payload = {
      name,
      color,
    };

    const response = await axios.post(routes.LISTS, payload);
    const data = response.data as List;
    await updateLists();
    navigate(appRoutes.LIST(data._id));
    toast(`List ${name} has been created successfully`);
  };

  return (
    <ListDialog
      title='Create new list'
      initialName=''
      initialColor={config.DEFAULT_LIST_COLOR}
      onSave={createList}
    >
      <Button variant='outline' className='w-full'>
        <IoMdAdd className='h-4 w-4 mr-2' />
        Create list
      </Button>
    </ListDialog>
  );
}
