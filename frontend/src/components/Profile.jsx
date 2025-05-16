import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PROFILE_INFO_ENDPOINT_URL, PFP_UPDATE_ENDPOINT_URL } from '../utils/ApiHost';
import { useNavigate } from 'react-router-dom';

import pfp from '../assets/anonymous.png';
import GlobalHeader from './GlobalHeader';

const ProfilePage = ({ isLogged }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
const BACKEND_URL = 'http://localhost:8000';

  const getInfo = () => {
    axios
      .get(PROFILE_INFO_ENDPOINT_URL, { withCredentials: true })
      .then((response) => {
        setProfileInfo(response.data);
        console.log("Profile info fetched:", response.data);      })
      .catch((error) => {
        console.error('Failed to fetch profile info:', error);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const uploadImage = () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('profile_picture', selectedImage);

    axios
      .post(PFP_UPDATE_ENDPOINT_URL, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        console.log('Profile picture updated:', response.data);
        setSelectedImage(null);
        getInfo(); // refresh updated image
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };
  const user = {
    name: profileInfo.username || 'Guest',
    email: profileInfo.email || 'Not provided',
    countriesVisited: profileInfo.countriesVisited || [],
    countriesWishlisted: profileInfo.countriesWishlist || [],
    profilePic: `${BACKEND_URL}${profileInfo.profile_picture}`,
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
            onError = {(e) => {
              e.target.onerror = null;
              e.target.src = pfp
            }}
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

          <div style={styles.uploadContainer}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
            <Button
              label="Upload Profile Picture"
              onClick={uploadImage}
              disabled={!selectedImage}
            />
          </div>

          <div style={styles.buttons}>
            <Button
              label="Travel Journal"
              onClick={() => navigate('/journal')}
            />
            <Button
              label="Bucketlist"
              onClick={() => navigate('/bucketlist')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Button = ({ label, onClick, disabled = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = () => {
    let base = disabled ? styles.buttonDisabled : styles.button;
    if (isPressed && !disabled) return { ...base, ...styles.buttonActive };
    if (isHovered && !disabled) return { ...base, ...styles.buttonHover };
    return base;
  };

  return (
    <button
      style={getButtonStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
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
    marginTop: '10px',
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
  buttonDisabled: {
    backgroundColor: '#cccccc',
    color: '#666',
    cursor: 'not-allowed',
    flex: 1,
    borderRadius: '8px',
    padding: '10px 15px',
    fontWeight: 'bold',
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
    width: '100%',
  },
  fileInput: {
    border: '1px solid #ddd',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '14px',
  },
};

export default ProfilePage;
