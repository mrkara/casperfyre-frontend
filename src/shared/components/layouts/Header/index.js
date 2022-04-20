import { ReactComponent as UserProfile } from 'assets/icons/user-circle.svg';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from 'stores/auth/actions';
import style from './style.module.scss';

export const Header = () => {
  const user = useSelector((state) => state.authReducer?.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const doLogout = () => {
    dispatch(logout(null, () => {
      history.push('/auth/login');
    }));
  }

  return (
    <div>
      <nav className='px-4 py-2.5 border-b'>
        <div className='flex flex-wrap justify-between items-center mx-auto'>
          <Link to='/' className='flex items-center'>
            <img className={style.logo} src="/images/logo.png" alt="logo" />
          </Link>
          <div className='w-full w-auto'>
            <div className='flex items-center gap-x-2' onClick={doLogout}>
              <UserProfile width={20} height={20} />
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
