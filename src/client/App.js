import Axios from 'axios';
import React, { useState } from 'react';
import './app.css';
import { useDispatch, useSelector } from 'react-redux';
import { login,selectAuthError } from './features/auth/authSlice';

const App = () => {
  const [error, setError] = useState(null);
  const [jwt, setJwt] = useState(null);
  const dispatch = useDispatch();
  const niceError = useSelector(selectAuthError);
  console.log('App -> niceError', niceError);

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
  const handleLogin = () => {
    const email = 'grmh9ko@mail.com';
    const password = '123456789';
    dispatch(login({ email, password }));
  };
  // const handleGetPost1 = (jwtinner) => () => {
  //   console.log(jwtinner);
  //   Axios.get('http://localhost:8080/api/posts', {
  //     headers: { Authorization: `Bearer ${jwtinner}` }
  //   }).then((data) => { console.log(data.data); }).catch((e) => { setError(e.response.statusText); });
  // };
  return (
    <div>
      <h1>HELLO!</h1>
      {niceError && <h1>{`Error: ${niceError}`}</h1>}
      <button type="button" onClick={handleLogin}>Логин</button>
      <button type="button" onClick={handleGetPost1()}>Дай посты с логином</button>

    </div>
  );
};

export default App;
