import React, { useState } from 'react';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import { LOGIN_ENDPOINT_URL } from '../utils/ApiHost';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.scss';

const LoginPage = ({ setIsLogged }) => {
  const { lang } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = (e) => {
    setError('');
    if (e.target.className.includes('login-button')) {
      axios
        .post(
          LOGIN_ENDPOINT_URL,
          { username, password },
          { withCredentials: true }
        )
        .then(() => {
          setIsLogged(true);
          navigate('/');
        })
        .catch(() => {
          setError(translations[lang].incorrectCredentials);
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{translations[lang].welcome}</h2>
        <p className="login-subtitle">{translations[lang].login}</p>
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
          {translations[lang].login}
        </button>
        {error && <div className="login-error">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
