import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className='dark:bg-zinc-950 dark:text-white'>
      <Outlet />
    </div>
  );
}
