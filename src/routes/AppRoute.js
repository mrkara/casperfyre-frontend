import { Route, Redirect } from 'react-router-dom';
import { getToken } from 'shared/core/services/auth';

const AppRoute = ({ component: Component, ...rest }) => {
  const token = getToken();
  console.log(token);
  return token ? (
    <Route {...rest} render={(matchProps) => <Component {...matchProps} />} />
  ) : (
    <Redirect to="/auth/login" />
  );
};

export default AppRoute;
