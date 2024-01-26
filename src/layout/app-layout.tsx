import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { useList } from '@/hooks/use-lists';
import { useAxiosPrivate } from '@/hooks/use-axios-private';
import routes from '@/api/routes';
import { List, DefaultListID } from '@/context/list-provider';

interface GetAllListsResponseDto {
  lists: List[];
  todayTasksCount: number;
  upcomingTasksCount: number;
}

export default function AppLayout() {
  const axios = useAxiosPrivate();
  const { setLists, updateDefaultListsCount } = useList();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getLists = async () => {
      const response = await axios.get(routes.LISTS);
      const data: GetAllListsResponseDto =
        response.data as GetAllListsResponseDto;
      const { lists, todayTasksCount, upcomingTasksCount } = data;
      if (isMounted) {
        setLists(lists);
        updateDefaultListsCount(DefaultListID.TODAY, todayTasksCount);
        updateDefaultListsCount(DefaultListID.UPCOMING, upcomingTasksCount);
      }
    };

    getLists();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className='h-screen grid grid-rows-[auto_1fr]'>
      <Header />
      <div className='grid grid-cols-[auto_1fr]'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
