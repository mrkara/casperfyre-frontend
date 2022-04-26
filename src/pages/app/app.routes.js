import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from 'shared/components/layouts/Header';
import Sidebar from 'shared/components/layouts/Sidebar';
import { fetchUserInfo } from 'stores/auth/actions';

const ApplicationsRoutes = lazy(() => import('./applications'));
const ApiKeysRoutes = lazy(() => import('./api-keys'));
const ApiKeysDetailRoutes = lazy(() => import('./api-keys/detail'));
const ApiLogsRoutes = lazy(() => import('./api-logs'));
const WalletsRoutes = lazy(() => import('./wallets'));
const SettingsRoutes = lazy(() => import('./settings'));

const AppRoutes = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  return (
    <>
      <Header />
      <div className='content-wrapper flex'>
        <Sidebar />
        <div className='py-2.5 px-6 h-full w-full overflow-y-auto overflow-x-auto'>
          <Suspense fallback={<div className='bg-white1 h-full w-full' />}>
            <Switch>
              <Route path={`${path}/applications`} component={ApplicationsRoutes} />
              <Route path={`${path}/api-keys`} component={ApiKeysRoutes} exact />
              <Route path={`${path}/api-keys/detail`} component={ApiKeysDetailRoutes} />
              <Route path={`${path}/api-logs`} component={ApiLogsRoutes} />
              <Route path={`${path}/wallets`} component={WalletsRoutes} />
              <Route path={`${path}/settings`} component={SettingsRoutes} />
              <Redirect from='*' to={`${path}/applications`} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;
