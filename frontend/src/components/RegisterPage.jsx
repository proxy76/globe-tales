import React from 'react';
import { REGISTER_ENDPOINT_URL } from '../utils/ApiHost';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({ setIsLogged }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const register = (e) => {
    if (e.target.className === 'button') {
      axios
        .post(
          REGISTER_ENDPOINT_URL,
          {
            username: username,
            password: password,
            email: email,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.status);
          setIsLogged(true);
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create an Account</h2>
        <p style={styles.subtitle}>Join GlobeTales and start your journey!</p>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
          style={styles.input}
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          style={styles.input}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          style={styles.input}
        />
        <button onClick={(e) => register(e)} className="button" style={styles.button}>
          Register
        </button>
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
    background: 'linear-gradient(135deg, #a8e6cf, #dcedf7)', // Light green and light blue gradient
  },
  card: {
    backgroundColor: '#ffffff', // White background
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for a professional look
    textAlign: 'center',
    width: '350px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4caf50', // Light green
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#000', // Light green
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    margin: '10px auto',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #dcedf7', // Light blue border
    width: '100%',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f9f9f9', // Subtle background for inputs
  },
  button: {
    backgroundColor: '#4caf50', // Light green
    color: '#ffffff', // White text
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '20px auto 0', // Center the button horizontally
    display: 'block', // Ensure the button is treated as a block element
    width: '100%', // Full width for consistency
  },
};

export default RegisterPage;
