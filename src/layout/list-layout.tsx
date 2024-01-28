import { Outlet } from 'react-router-dom';

export default function ListLayout() {
  return (
    <div className='grig grid-cols-2'>
      <Outlet />
    </div>
  );
}
