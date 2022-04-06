import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import AuthRoute from './AuthRoute';

const AuthRoutes = lazy(() => import('pages/auth/auth.routes'));

const Routes = () => {
  return (
    <Suspense fallback={null}>
      <ScrollToTop />
      <Switch>
        <AuthRoute path='/auth' component={AuthRoutes} />
        {/* <Route exact path='/' component={Home} /> */}
      </Switch>
    </Suspense>
  );
};

export default Routes;
