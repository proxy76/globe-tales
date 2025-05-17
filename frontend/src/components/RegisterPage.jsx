import React, { useState, useRef } from 'react';
import { REGISTER_ENDPOINT_URL } from '../utils/ApiHost';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

const RegisterPage = ({ setIsLogged }) => {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    setError('');
    if (
      (e.target.className === 'button') ||
      (e.type === "keydown" && (e.code === "Enter" || e.key === "Enter"))
    ) {
      axios
        .post(
          REGISTER_ENDPOINT_URL,
          { username, password, email },
          { withCredentials: true }
        )
        .then(() => {
          setIsLogged(true);
          navigate('/');
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message === 'Username already taken'
          ) {
            setError(translations[lang].usernameTaken);
          } else if (
            error.response &&
            error.response.data &&
            error.response.data.message === 'Invalid email format'
          ) {
            setError(translations[lang].invalidEmail);
          } else {
            setError(translations[lang].registrationFailed);
          }
        });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{translations[lang].register}</h2>
        <p style={styles.subtitle}>{translations[lang].welcome}</p>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
          style={styles.input}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.key === "Enter") {
              e.preventDefault();
              emailRef.current && emailRef.current.focus();
            }
          }}
        />
        <input
          type="email"
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          style={styles.input}
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
          style={styles.input}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.key === "Enter") {
              register(e);
            }
          }}
        />
        <button onClick={register} className="button" style={styles.button}>
          {translations[lang].register}
        </button>
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #a8e6cf, #dcedf7)',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '350px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#000',
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    margin: '10px auto',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #dcedf7',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '20px auto 0',
    display: 'block',
    width: '100%',
  },
  error: {
    color: '#e53935',
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

export default RegisterPage;
