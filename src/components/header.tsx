import config from '@/config';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className='px-4 py-3 border-b-2'>
      <div className='flex items-center gap-8'>
        <button>
          <GiHamburgerMenu className='h-6 w-6' />
        </button>
        <NavLink to={'/'}>
          <h3 className='text-gray-600 scroll-m-20 text-2xl font-semibold tracking-tight'>
            {config.APP_NAME}
          </h3>
        </NavLink>
      </div>
    </div>
  );
}
