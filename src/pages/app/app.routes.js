import Header from 'shared/components/layouts/Header';
import Sidebar from 'shared/components/layouts/Sidebar';
import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const ApplicationsRoutes = lazy(() => import('./applications'));
const ApiKeysRoutes = lazy(() => import('./apiKeys'));
const ApiLogsRoutes = lazy(() => import('./apiLogs'));
const WalletsRoutes = lazy(() => import('./wallets'));

const AppRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Header />
      <div className='content-wrapper flex'>
        <Sidebar />
        <div className='py-2.5 px-6 h-full w-full overflow-hidden'>
          <Suspense fallback={<div className='bg-white1 h-full w-full' />}>
            <Switch>
              <Route path={`${path}/applications`} component={ApplicationsRoutes} />
              <Route path={`${path}/api-keys`} component={ApiKeysRoutes} />
              <Route path={`${path}/api-logs`} component={ApiLogsRoutes} />
              <Route path={`${path}/wallets`} component={WalletsRoutes} />
              <Redirect from='*' to={`${path}/applications`} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;
