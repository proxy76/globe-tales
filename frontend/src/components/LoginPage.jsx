import React from 'react';

const LoginPage = () => {
  return (
    <div style={styles.container}>
      <h2>Login to GlobeTales</h2>
      <input type="text" placeholder="Username" style={styles.input} />
      <input type="password" placeholder="Password" style={styles.input} />
      <button className="button">Login</button>
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
