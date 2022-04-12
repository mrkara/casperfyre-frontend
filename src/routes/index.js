import { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import AuthRoute from './AuthRoute';
import AppRoute from './AppRoute';
import { Redirect } from 'react-router-dom';

const AuthRoutes = lazy(() => import('pages/auth/auth.routes'));
const AppRoutes = lazy(() => import('pages/app/app.routes'));

const Routes = () => {
  return (
    <Suspense fallback={null}>
      <ScrollToTop />
      <Switch>
        <AuthRoute path='/auth' component={AuthRoutes} />
        <AppRoute exact path='/app' component={AppRoutes} />
        <Redirect from='*' to={`/app`} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
