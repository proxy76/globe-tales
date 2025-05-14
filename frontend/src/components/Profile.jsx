import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PROFILE_INFO_ENDPOINT_URL } from '../utils/ApiHost';
import { useNavigate } from 'react-router-dom';

import pfp from '../assets/anonymous.png';
import GlobalHeader from './GlobalHeader';

const ProfilePage = ({ isLogged }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const navigate = useNavigate();

  const getInfo = () => {
    axios
      .get(PROFILE_INFO_ENDPOINT_URL, { withCredentials: true })
      .then((response) => {
        setProfileInfo(response.data);
        console.log("Profile info fetched:", response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch profile info:', error);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const user = {
    name: profileInfo.username || 'Guest',
    email: profileInfo.email || 'Not provided',
    countriesVisited: profileInfo.countriesVisited || [],
    countriesWishlisted: profileInfo.countriesWishlist || [],
    profilePic: profileInfo.profile_picture || pfp,
  };

  return (
    <>
      <GlobalHeader isLogged={isLogged} />
      <div style={styles.container}>
        <div style={styles.card}>
          <img
            src={user.profilePic}
            alt="Profile"
            style={styles.profilePicture}
          />
          <h2 style={styles.name}>{user.name}</h2>
          <p style={styles.email}>Email: {user.email}</p>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>{user.countriesVisited.length}</h3>
              <p style={styles.statLabel}>Countries Visited</p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>{user.countriesWishlisted.length}</h3>
              <p style={styles.statLabel}>Wishlist</p>
            </div>
          </div>
          <div style={styles.buttons}>
            <Button
              label="Travel Journal"
              onClick={() => {
                console.log('Travel Journal clicked');
                navigate('/journal');
              }}
            />
            <Button
              label="Bucketlist"
              onClick={() => {
                console.log('Bucketlist clicked');
                navigate('/bucketlist');
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Button = ({ label, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = () => {
    if (isPressed) return { ...styles.button, ...styles.buttonActive };
    if (isHovered) return { ...styles.button, ...styles.buttonHover };
    return styles.button;
  };

  return (
    <button
      className="profileButton"
      style={getButtonStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    background: 'linear-gradient(135deg, #a8e6cf, #dcedf7)',
    paddingTop: '50px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profilePicture: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    border: '3px solid #4caf50',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: '10px',
  },
  email: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '20px',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#4caf50',
  },
  statLabel: {
    fontSize: '14px',
    color: '#555',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    width: '100%',
  },
  button: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 15px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  buttonHover: {
    backgroundColor: '#43a047',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
  buttonActive: {
    backgroundColor: '#388e3c',
    transform: 'translateY(2px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default ProfilePage;
