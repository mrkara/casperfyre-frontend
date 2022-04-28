import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from 'shared/components/layouts/Header';
import Sidebar from 'shared/components/layouts/Sidebar';
import { fetchUserInfo } from 'stores/auth/actions';
import AdminRoutes from './app/admin.routes';
import UserRoutes from './user/user.routes';

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  const isAdmin = true;

  return (
    <>
      <Header />
      <div className='content-wrapper flex'>
        <Sidebar isAdmin={isAdmin} />
        <div className='py-2.5 px-6 h-full w-full overflow-y-auto overflow-x-auto'>
          <Suspense fallback={<div className='bg-white1 h-full w-full' />}>
            {isAdmin ? <AdminRoutes /> : <UserRoutes />}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;
