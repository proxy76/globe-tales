import React, { useState } from 'react';
import { LOGIN_ENDPOINT_URL } from '../utils/ApiHost';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.scss';

const LoginPage = ({ setIsLogged }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = (e) => {
    if (e.target.className.includes('login-button')) {
      axios
        .post(
          LOGIN_ENDPOINT_URL,
          {
            username: username,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setIsLogged(true);
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to GlobeTales</h2>
        <p className="login-subtitle">Login to explore the world with us!</p>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          className="login-input"
        />
        <button onClick={login} className="button login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
