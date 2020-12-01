import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { referer: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
