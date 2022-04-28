import React, { lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const DashboardRoutes = lazy(() => import('./dashboard'));
const MyAPILogsRoutes = lazy(() => import('./myAPILogs'));
const KeysAndWalletsRoutes = lazy(() => import('./keysAndWallets'));
const SettingsRoutes = lazy(() => import('./settings'));

const UserRoutes = (props) => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={DashboardRoutes} />
      <Route path={`${path}/my-api-logs`} component={MyAPILogsRoutes} />
      <Route path={`${path}/keys-wallets`} component={KeysAndWalletsRoutes} />
      <Route path={`${path}/settings`} component={SettingsRoutes} />
      <Redirect from='*' to={`${path}/dashboard`} />
    </Switch>
  );
};

UserRoutes.propTypes = {};

export default UserRoutes;
