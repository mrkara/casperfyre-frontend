import { ReactComponent as UserProfile } from 'assets/icons/user-circle.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss';

export const Header = () => {
  return (
    <div>
      <nav className='px-4 py-2.5 border-b'>
        <div className='flex flex-wrap justify-between items-center mx-auto'>
          <Link to='/' className='flex items-center'>
            <img className={style.logo} src="/images/logo.png" alt="logo" />
          </Link>
          <div className='w-full w-auto'>
            <div className='flex items-center gap-x-2'>
              <UserProfile width={20} height={20} />
              <p>Mickey+1@gmail.com</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
