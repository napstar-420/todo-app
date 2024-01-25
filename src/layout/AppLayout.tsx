import Sidebar from '@/components/sidebar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className='grid grid-cols-[auto_1fr] gap-4 p-4 h-screen'>
      <Sidebar />
      <Outlet />
    </div>
  );
}
