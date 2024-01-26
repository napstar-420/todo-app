import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout() {
  return (
    <div className='dark:bg-zinc-950 dark:text-white'>
      <Outlet />
      <Toaster />
    </div>
  );
}
