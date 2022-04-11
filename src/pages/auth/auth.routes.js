import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const LoginRoutes = lazy(() => import('./login'));
const ThanksRoutes = lazy(() => import('./thanks'));
const SignUpRoutes = lazy(() => import('./signup'));
const ResetPasswordRoutes = lazy(() => import('./reset-password'));
const SetPasswordRoutes = lazy(() => import('./set-new-password'));
const VerifyCodeRoutes = lazy(() => import('./verify-code'));
const SendToMail = lazy(() => import('./send-to-mail'));

const AuthRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Suspense fallback={<div className='bg-white1 h-full w-full' />}>
      <Switch>
        <Route path={`${path}/login`} component={LoginRoutes} exact />
        <Route path={`${path}/signup`} component={SignUpRoutes} exact />
        <Route path={`${path}/thanks`} component={ThanksRoutes} exact />
        <Route path={`${path}/reset-password`} component={ResetPasswordRoutes} exact />
        <Route path={`${path}/new-password`} component={SetPasswordRoutes} exact />
        <Route path={`${path}/verify-code`} component={VerifyCodeRoutes} exact />
        <Route path={`${path}/send-to-mail`} component={SendToMail} exact />
        <Redirect from='*' to={`${path}/login`} />
      </Switch>
    </Suspense>
  );
};

export default AuthRoutes;
