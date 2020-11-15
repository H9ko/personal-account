import React from 'react';
import './application.scss';
import { useSelector } from 'react-redux';
import {
  Redirect, Route, Switch
} from 'react-router-dom';
import { selectorsAuth } from './features/auth/authSlice';
import Auth from './features/auth/Auth';
import Registration from './features/auth/Registration';
import Account from './components/account/Account';

const Signup = () => (
  <div>
    <Auth />
  </div>
);

const App = () => {
  const isAuthenticated = useSelector(selectorsAuth.selectIsAuthenticated);

  // const handleRegister = () => {
  //   Axios({
  //     method: 'post',
  //     url: 'http://localhost:8080/api/register',
  //     data: {
  //       email: 'grmh9ko@mail.com',
  //       password: '123456789'
  //     }
  //   }).then((data) => console.log('register', data)).catch((e) => {
  //     setError(e.response.data);
  //   });
  // };

  // const handleGetPost1 = (jwtinner) => () => {
  //   console.log(jwtinner);
  //   Axios.get('http://localhost:8080/api/posts', {
  //     headers: { Authorization: `Bearer ${jwtinner}` }
  //   }).then((data) => { console.log(data.data); }).catch((e) => { setError(e.response.statusText); });
  // };
  // return (
  //   <div>
  //     <h1>HELLO!</h1>
  //     {niceError && <h1>{`Error: ${niceError}`}</h1>}
  //     <button type="button" onClick={handleLogin}>Логин</button>
  //   </div>
  // );

  return (
    <Switch>
      <Route exact path="/" render={() => (!isAuthenticated ? <Redirect to="/signup" /> : <Redirect to="/account" />)} />
      <Route path="/signup" component={Signup} />
      <Route path="/account" component={Account} />
      <Route path="/registration" component={Registration} />
    </Switch>
  );
};

export default App;
