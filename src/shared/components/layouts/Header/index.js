import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white h-[60px] fixed z-10 w-full h-14 flex justify-between items-center py-4 px-6 shadow-lg">
      <div className="flex gap-6">
        <Link to='/' >
          <img className="h-[50px]" src="/images/logo.jpg" alt="logo" />
        </Link>
      </div>
      <Link to="/favorite" className='flex gap-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
      </Link>
    </header>
  );
};

export default Header;
