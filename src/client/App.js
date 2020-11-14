import React from 'react';
import './application.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect, Route, Switch, useHistory
} from 'react-router-dom';
import { actionsAuth, selectorsAuth } from './features/auth/authSlice';
import Login from './components/login/Login';
import Registration from './features/auth/Registration';

const Signup = () => (
  <div>
    <Login />
  </div>
);

const Account = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const niceError = useSelector(selectorsAuth.selectError);
  const handleLogOut = () => {
    dispatch(actionsAuth.logOut());
    history.push('/');
  };
  return (
    <div>
      <h1>HELLO Account!</h1>
      {niceError && <h1>{`Error: ${niceError}`}</h1>}
      <button type="button" onClick={handleLogOut}>LogOut</button>
    </div>
  );
};

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
