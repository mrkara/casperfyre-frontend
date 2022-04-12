import { lazy, Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const HomeRoutes = lazy(() => import('./home'));

const AppRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Suspense fallback={<div className='bg-white1 h-full w-full' />}>
      <Switch>
        <Route path={`${path}`} component={HomeRoutes} exact />
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
