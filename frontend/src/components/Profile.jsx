import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PROFILE_INFO_ENDPOINT_URL } from '../utils/ApiHost';
import { useNavigate, Link } from 'react-router-dom';

import pfp from '../assets/anonymous.png';
import Header from './Header';

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
      <Header isLogged={isLogged} />
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
            <Link to="/journal">
              <Button label="Travel Journal" />
            </Link>
            <Link to="/bucketlist">
              <Button label="Bucketlist" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const Button = ({ label }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = () => {
    if (isPressed) return { ...styles.button, ...styles.buttonActive };
    if (isHovered) return { ...styles.button, ...styles.buttonHover };
    return styles.button;
  };

  return (
    <button
      style={getButtonStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {label}
    </button>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items closer to the top
    height: '100vh',
    background: 'linear-gradient(135deg, #a8e6cf, #dcedf7)', // Light green and light blue gradient
    paddingTop: '50px', // Add padding to push the card down slightly
  },
  card: {
    backgroundColor: '#ffffff', // White background
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for a professional look
    textAlign: 'center',
    width: '400px',
    display: 'flex',
    flexDirection: 'column', // Ensure all elements are stacked vertically
    alignItems: 'center', // Center all elements horizontally
  },
  profilePicture: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    border: '3px solid #4caf50', // Light green border
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4caf50', // Light green
    marginBottom: '10px',
  },
  email: {
    fontSize: '16px',
    color: '#555', // Subtle gray for email
    marginBottom: '20px',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%', // Ensure stats take up full width
    marginBottom: '20px',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#4caf50', // Light green
  },
  statLabel: {
    fontSize: '14px',
    color: '#555', // Subtle gray for labels
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    width: '100%', // Ensure buttons take up full width
  },
  button: {
    backgroundColor: '#4caf50', // Light green
    color: '#ffffff', // White text
    border: 'none',
    borderRadius: '8px',
    padding: '10px 15px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease', // Smooth transition for hover and press effects
    flex: 1,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for a raised effect
  },
  buttonHover: {
    backgroundColor: '#43a047', // Slightly darker green on hover
    transform: 'translateY(-2px)', // Lift the button slightly on hover
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)', // Stronger shadow on hover
  },
  buttonActive: {
    backgroundColor: '#388e3c', // Even darker green on press
    transform: 'translateY(2px)', // Push the button down on press
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow on press
  },
};

export default ProfilePage;
