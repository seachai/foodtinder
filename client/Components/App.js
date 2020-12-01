import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../Context/Auth';

import HomePage from '../Pages/HomePage';
import SetupPage from '../Pages/SetupPage';
import LandingPage from '../Pages/LandingPage';
import PrivateRoute from '../Pages/PrivateRoute';
import Info from './Info';

const App = () => {
  const [auth, setAuth] = useState();
  const [restaurants, setRestaurants] = useState();
  const [match, setMatch] = useState();
  const [info, setInfo] = useState();

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
          <Route path="/homepage" component={HomePage} />
          <Route path="/setup" component={SetupPage} />
          <Route path="/info" component={Info} />
          {/* <PrivateRoute path="/homepage" component={HomePage} /> */}
        </AuthContext.Provider>
      </Switch>
    </Router>
  );
};

export default App;
