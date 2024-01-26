import config from '@/config';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import { ToggleTheme } from './toggle-theme';

export default function Header() {
  return (
    <div className='px-4 py-3 border-b-2 dark:border-b-zinc-800 flex items-center justify-between'>
      <div className='flex items-center gap-8'>
        <button>
          <GiHamburgerMenu className='h-4 w-4' />
        </button>
        <NavLink to={'/'}>
          <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
            {config.APP_NAME}
          </h4>
        </NavLink>
      </div>
      <div>
        <ToggleTheme />
      </div>
    </div>
  );
}
