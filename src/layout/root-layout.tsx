import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sooner } from '@/components/ui/sonner';

export default function RootLayout() {
  return (
    <div className='bg-theme-primary text-theme-primary'>
      <Outlet />
      <Toaster />
      <Sooner />
    </div>
  );
}
