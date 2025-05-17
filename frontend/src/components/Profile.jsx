import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PROFILE_INFO_ENDPOINT_URL, PFP_UPDATE_ENDPOINT_URL } from '../utils/ApiHost';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import pfp from '../assets/anonymous.png';
import GlobalHeader from './GlobalHeader';

const ProfilePage = ({ isLogged }) => {
  const { lang, setLang } = useLanguage();
  const [profileInfo, setProfileInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const BACKEND_BASE_URL = 'http://localhost:8000';

  const getInfo = () => {
    axios
      .get(PROFILE_INFO_ENDPOINT_URL, { withCredentials: true })
      .then((response) => setProfileInfo(response.data))
      .catch((error) => console.error('Failed to fetch profile info:', error));
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const uploadImage = () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append('profile_picture', selectedImage);
    axios
      .post(PFP_UPDATE_ENDPOINT_URL, formData, { withCredentials: true })
      .then(() => getInfo());
  };

  // Toggle Button
  const toggleLang = () => setLang(lang === "ro" ? "en" : "ro");

  return (
    <>
      <GlobalHeader isLogged={isLogged} />
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <button
              onClick={toggleLang}
              style={{
                ...styles.toggleBtn,
                background: lang === "ro"
                  ? "linear-gradient(90deg, #4caf50 60%, #e0e0e0 100%)"
                  : "linear-gradient(90deg, #e0e0e0 0%, #4caf50 40%)",
                color: "#222",
              }}
              aria-label="Schimbă limba"
            >
              <span style={{
                fontWeight: lang === "ro" ? "bold" : "normal",
                color: lang === "ro" ? "#fff" : "#222"
              }}>RO</span>
              <span style={{
                margin: "0 8px",
                color: "#888"
              }}>|</span>
              <span style={{
                fontWeight: lang === "en" ? "bold" : "normal",
                color: lang === "en" ? "#fff" : "#222"
              }}>EN</span>
            </button>
          </div>
          <img
            src={ BACKEND_BASE_URL + profileInfo.profile_picture}
            alt="Profile"
            style={styles.profilePicture}
            onError={e => { e.target.onerror = null; e.target.src = pfp }}
          />
          <h2 style={styles.name}>{profileInfo.username}</h2>
          <p style={styles.email}>Email: {profileInfo.email}</p>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>{profileInfo.countriesVisited?.length || 0}</h3>
              <p style={styles.statLabel}>{translations[lang].visited}</p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>{profileInfo.countriesWishlist?.length || 0}</h3>
              <p style={styles.statLabel}>{translations[lang].wishlist}</p>
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
              label={translations[lang].changePic}
              onClick={uploadImage}
              disabled={!selectedImage}
            />
          </div>
          <div style={styles.buttons}>
            <Button
              label={translations[lang].travelJournal}
              onClick={() => navigate('/journal')}
            />
            <Button
              label={translations[lang].bucketlist}
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
  toggleBtn: {
    border: 'none',
    borderRadius: '20px',
    padding: '6px 18px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    marginBottom: 16,
    marginTop: 8,
    marginRight: 0,
    outline: 'none',
    transition: 'background 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    boxShadow: '0 2px 8px rgba(76,175,80,0.08)',
  },
};

export default ProfilePage;
