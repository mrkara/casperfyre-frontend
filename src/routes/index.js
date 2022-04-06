import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));

const Routes = () => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
