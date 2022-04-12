import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const LoginRoutes = lazy(() => import('./login'));
const SignUpRoutes = lazy(() => import('./signup'));
const ForgotPasswordRoutes = lazy(() => import('./forgot-password'));
const ResetPasswordRoutes = lazy(() => import('./reset-password'));
const VerifyCodeRoutes = lazy(() => import('./verify-code'));
const SendToMail = lazy(() => import('./send-to-mail'));

const AuthRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Suspense fallback={<div className='bg-white1 h-full w-full' />}>
      <Switch>
        <Route path={`${path}/login`} component={LoginRoutes} exact />
        <Route path={`${path}/signup`} component={SignUpRoutes} exact />
        <Route path={`${path}/forgot-password`} component={ForgotPasswordRoutes} exact />
        <Route path={`${path}/reset-password/:hash`} component={ResetPasswordRoutes} exact />
        <Route path={`${path}/verify-code`} component={VerifyCodeRoutes} exact />
        <Route path={`${path}/send-to-mail`} component={SendToMail} exact />
        <Redirect from='*' to={`${path}/login`} />
      </Switch>
    </Suspense>
  );
};

export default AuthRoutes;
