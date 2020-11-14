import Axios from 'axios';
import React, { useState } from 'react';
import './app.css';

const App = () => {
  const [error, setError] = useState(null);
  const [jwt, setJwt] = useState(null);
  const handleRegister = () => {
    Axios({
      method: 'post',
      url: 'http://localhost:8080/api/register',
      data: {
        email: 'grmh9ko@mail.com',
        password: '123456789'
      }
    }).then((data) => console.log('register', data)).catch((e) => {
      setError(e.response.data);
    });
  };
  const handleLogin = () => {
    Axios({
      method: 'post',
      url: 'http://localhost:8080/api/signin',
      data: {
        email: 'test@mail.com',
        password: '123456789'
      }
    }).then((data) => { setJwt(data.data.accessToken); }).catch((e) => { setError(e.response.data); });
  };
  const handleGetPost1 = (jwtinner) => () => {
    console.log(jwtinner);
    Axios.get('http://localhost:8080/api/posts', {
      headers: { Authorization: `Bearer ${jwtinner}` }
    }).then((data) => { console.log(data.data); }).catch((e) => { setError(e.response.statusText); });
  };
  const handleGetPost2 = () => {
    Axios({
      method: 'get',
      url: 'http://localhost:8080/api/posts',
    }).then((data) => { console.log(data); }).catch((e) => { setError(e.response.statusText); });
  };
  return (
    <div>
      <h1>HELLO!</h1>
      {error && <h1>{`Error: ${error}`}</h1>}
      <button type="button" onClick={handleRegister}>Регистрация</button>
      <button type="button" onClick={handleLogin}>Логин</button>
      <button type="button" onClick={handleGetPost1(jwt)}>Дай посты с логином</button>
      <button type="button" onClick={handleGetPost2}>Дай посты без логина</button>

    </div>
  );
};

export default App;
