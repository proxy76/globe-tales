import React from 'react';
import {useState, useEffect} from 'react';
import { LOGIN_ENDPOINT_URL } from '../utils/ApiHost';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const login = (e) => {
    if (e.target.className == 'button') {
      axios.post(LOGIN_ENDPOINT_URL, {
        username: username,
        password: password
    }, {
        withCredentials: true
    })
        .then((response) => {
            console.log(response.status);
            setIsLogged(true)
            useNavigate('/')
        })
        .catch((error) => {
            console.log(error);
        });
    }
  }
  return (
    <div style={styles.container}>
      <h2>Login to GlobeTales</h2>
      <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" style={styles.input} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" style={styles.input} />
      <button onClick={(e) => login(e)} className="button">Login</button>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '100px',
    textAlign: 'center',
  },
  input: {
    display: 'block',
    margin: '10px auto',
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    width: '250px',
  },
};

export default LoginPage;
