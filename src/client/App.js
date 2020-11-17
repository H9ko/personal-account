import React from 'react';
import './application.scss';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { selectorsAuth } from './features/auth/authSlice';
import Auth from './features/auth/Auth';
import Registration from './features/auth/Registration';
import Account from './components/account/Account';

const App = () => {
  const isAuthenticated = useSelector(selectorsAuth.selectIsAuthenticated);
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          !isAuthenticated ? (
            <Redirect to="/signup" />
          ) : (
            <Redirect to="/account" />
          )
        }
      />
      <Route path="/signup" component={Auth} />
      <Route path="/account" component={Account} />
      <Route path="/registration" component={Registration} />
    </Switch>
  );
};

export default App;
