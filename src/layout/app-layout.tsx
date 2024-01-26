import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
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
