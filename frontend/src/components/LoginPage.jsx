import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import { LOGIN_ENDPOINT_URL } from '../utils/ApiHost';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.scss';

const LoginPage = ({ setIsLogged }) => {
  const { lang } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const location = useLocation()
    useEffect(() => {
        if (!location.search.includes("reloaded=1")) {
            window.location.replace(location.pathname + "?reloaded=1");
        } else {
            window.history.replaceState({}, "", location.pathname);
        }
    }, [location]);
  useEffect(() => {
    usernameRef.current && usernameRef.current.focus();
  }, []);

  const login = (e) => {
    setError('');
    if (
      (e.target.className && e.target.className.includes('login-button')) ||
      (e.type === "keydown" && (e.code === "Enter" || e.key === "Enter"))
    ) {
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
          ref={usernameRef}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
          className="login-input"
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.key === "Enter") {
              e.preventDefault();
              passwordRef.current && passwordRef.current.focus();
            }
          }}
        />
        <input
          type="password"
          ref={passwordRef}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          className="login-input"
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.key === "Enter") {
              login(e);
            }
          }}
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
