import { lazy, Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';
import ScrollToTop from './ScrollToTop';

const AuthRoutes = lazy(() => import('pages/auth/auth.routes'));
const AppRoutes = lazy(() => import('pages/routes'));

const Routes = () => {
  return (
    <Suspense fallback={null}>
      <ScrollToTop />
      <Switch>
        <AuthRoute path='/auth' component={AuthRoutes} />
        <AppRoute path='/app' component={AppRoutes} />
        <Redirect from='*' to={`/app`} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
