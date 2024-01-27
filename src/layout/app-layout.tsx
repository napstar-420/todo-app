import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { useList } from '@/hooks/use-lists';
import { useTag } from '@/hooks/use-tag';

export default function AppLayout() {
  const { updateLists } = useList();
  const { updateTags } = useTag();

  useEffect(() => {
    const controller = new AbortController();
    updateLists(controller);
    updateTags(controller);
    return () => controller.abort();
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
