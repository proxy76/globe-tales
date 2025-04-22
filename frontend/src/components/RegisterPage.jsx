import React from 'react';
import { REGISTER_ENDPOINT_URL } from '../utils/ApiHost';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const login = (e) => {
    if (e.target.className == 'button') {
      axios.post(REGISTER_ENDPOINT_URL, {
        username: username,
        password: password,
        email: email
      }, {
        withCredentials: true
      })
        .then((response) => {
          console.log(response.status);
          setIsLogged(true)
          navigate('/')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div style={styles.container}>
      <h2>Create an Account</h2>
      <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" style={styles.input} />
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" style={styles.input} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" style={styles.input} />
      <button onClick={(e) => login(e)} className="button">Register</button>
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

export default RegisterPage;
