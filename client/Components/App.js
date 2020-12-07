import React, { useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { AuthContext } from '../Context/Auth';

import HomePage from '../Pages/HomePage';
import SetupPage from '../Pages/SetupPage';
import LandingPage from '../Pages/LandingPage';
import Info from './Info';

const App = () => {
  const [auth, setAuth] = useState();
  const [restaurants, setRestaurants] = useState();
  const [match, setMatch] = useState();
  const [info, setInfo] = useState();

  const AuthUser = ({ children, ...props }) => {
    return (
      <Route
        {...props}
        render={({ location }) => {
          console.log(location);
          return auth ? children : <Redirect to="/" />;
        }}
      />
    );
  };

  return (
    <Router>
      <Switch>
        <AuthContext.Provider
          value={{
            auth,
            setAuth,
            restaurants,
            setRestaurants,
            match,
            setMatch,
            info,
            setInfo,
          }}
        >
          <Route exact path="/" component={LandingPage} />
          <AuthUser>
            <Route path="/setup" component={SetupPage} />
            <Route path="/homepage/" component={HomePage} />
            <Route path="/info" component={Info} />
          </AuthUser>
        </AuthContext.Provider>
      </Switch>
    </Router>
  );
};

export default App;
