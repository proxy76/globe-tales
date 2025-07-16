import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PROFILE_INFO_ENDPOINT_URL, PFP_UPDATE_ENDPOINT_URL } from '../utils/ApiHost';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import pfp from '../assets/anonymous.png';
import GlobalHeader from './GlobalHeader';
import { FaWindows } from 'react-icons/fa';
import ErrorPage from './ErrorPage';

const ProfilePage = ({ isLogged }) => {
  const { lang, setLang } = useLanguage();
  const [profileInfo, setProfileInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ visited: 0, wishlist: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const BACKEND_BASE_URL = 'https://globe-tales-backend.onrender.com';
    useEffect(() => {
        if (!location.search.includes("reloaded=1")) {
            window.location.replace(location.pathname + "?reloaded=1");
        } else {
            window.history.replaceState({}, "", location.pathname);
        }
    }, [location]);
  const getInfo = () => {
    axios
      .get(PROFILE_INFO_ENDPOINT_URL, { withCredentials: true })
      .then((response) => {
        setProfileInfo(response.data);
        setTimeout(() => {
          animateNumbers(response.data);
        }, 500);
      })
      .catch((error) => console.error('Failed to fetch profile info:', error));
  };

  const animateNumbers = (data) => {
    const visitedTarget = data.countriesVisited?.length || 0;
    const wishlistTarget = data.countriesWishlist?.length || 0;
    
    const duration = 1000;
    const steps = 30;
    const visitedStep = visitedTarget / steps;
    const wishlistStep = wishlistTarget / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnimatedStats({
        visited: Math.min(Math.floor(visitedStep * currentStep), visitedTarget),
        wishlist: Math.min(Math.floor(wishlistStep * currentStep), wishlistTarget)
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats({ visited: visitedTarget, wishlist: wishlistTarget });
      }
    }, duration / steps);
  };

  useEffect(() => {
    getInfo();
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (isLogged === false) return <ErrorPage />;
  else if (isLogged === undefined || isLogged === null) return null;

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const uploadImage = () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append('profile_picture', selectedImage);
    axios
      .post(PFP_UPDATE_ENDPOINT_URL, formData, { withCredentials: true })
      .then(() => {getInfo(); window.location.reload()});
  };

  const toggleLang = () => setLang(lang === "ro" ? "en" : "ro");

  return (
    <>
      <GlobalHeader isLogged={isLogged} />
      <div style={styles.container}>
        {/* Enhanced Background Elements */}
        <div style={styles.backgroundElements}>
          <div style={{...styles.floatingElement, ...styles.circle1}}></div>
          <div style={{...styles.floatingElement, ...styles.circle2}}></div>
          <div style={{...styles.floatingElement, ...styles.circle3}}></div>
          <div style={{...styles.floatingElement, ...styles.square1}}></div>
          <div style={{...styles.floatingElement, ...styles.square2}}></div>
          <div style={{...styles.floatingElement, ...styles.triangle1}}></div>
          <div style={{...styles.floatingElement, ...styles.triangle2}}></div>
        </div>
        
        {/* Enhanced Card */}
        <div style={{
          ...styles.card,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          {/* Glass morphism overlay */}
          <div style={styles.cardOverlay}></div>
          
          {/* Language Toggle */}
          <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", position: 'relative', zIndex: 10 }}>
            <button
              onClick={toggleLang}
              style={{
                ...styles.toggleBtn,
                background: lang === "ro"
                  ? "linear-gradient(135deg, #0be044 0%, #0777d9 100%)"
                  : "linear-gradient(135deg, #0777d9 0%, #0be044 100%)",
                color: "#fff",
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.8)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
              }}
            >
              <span style={{
                fontWeight: lang === "ro" ? "bold" : "normal",
                opacity: lang === "ro" ? 1 : 0.7,
                transform: lang === "ro" ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}>RO</span>
              <div style={styles.langSeparator}></div>
              <span style={{
                fontWeight: lang === "en" ? "bold" : "normal",
                opacity: lang === "en" ? 1 : 0.7,
                transform: lang === "en" ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}>EN</span>
            </button>
          </div>
          
          {/* Enhanced Profile Picture */}
          <div style={styles.profilePictureContainer}>
            <div style={styles.profilePictureWrapper}>
              <img
                src={BACKEND_BASE_URL + profileInfo.profile_picture}
                alt="Profile"
                style={{
                  ...styles.profilePicture,
                  transform: isVisible ? 'scale(1)' : 'scale(0.6)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
                }}
                onError={e => { e.target.onerror = null; e.target.src = pfp }}
              />
              <div style={{
                ...styles.profileRing,
                transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.6) rotate(-180deg)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
              }}></div>
              <div style={{
                ...styles.profileGlow,
                opacity: isVisible ? 1 : 0,
                transition: 'all 1.5s ease 0.5s'
              }}></div>
            </div>
          </div>
          
          {/* Enhanced Name */}
          <h2 style={{
            ...styles.name,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s'
          }}>
            {profileInfo.username}
          </h2>
          
          {/* Enhanced Email */}
          <p style={{
            ...styles.email,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
          }}>
            {profileInfo.email}
          </p>
          
          {/* Enhanced Stats */}
          <div style={{
            ...styles.stats,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s'
          }}>
            <AnimatedStatItem 
              number={animatedStats.visited}
              label={translations[lang]?.visited || 'Visited'}
              isVisible={isVisible}
              color="#667eea"
            />
            <AnimatedStatItem 
              number={animatedStats.wishlist}
              label={translations[lang]?.wishlist || 'Wishlist'}
              isVisible={isVisible}
              color="#f093fb"
            />
          </div>
          
          {/* Enhanced Upload Container */}
          <div style={{
            ...styles.uploadContainer,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s'
          }}>
            <div style={styles.fileInputContainer}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.fileInput}
                id="fileInput"
              />
              <label htmlFor="fileInput" style={styles.fileInputLabel}>
                <span style={styles.fileInputIcon}>📁</span>
                <span>{selectedImage ? selectedImage.name : 'Choose Image'}</span>
              </label>
            </div>
            <EnhancedButton
              label={translations[lang]?.changePic || 'Change Picture'}
              onClick={uploadImage}
              disabled={!selectedImage}
              isVisible={isVisible}
              variant="primary"
            />
          </div>
          
          {/* Enhanced Navigation Buttons */}
          <div style={{
            ...styles.buttons,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s'
          }}>
            <EnhancedButton
              label={translations[lang]?.travelJournal || 'Travel Journal'}
              onClick={() => navigate('/journal')}
              isVisible={isVisible}
              variant="secondary"
              icon="📖"
            />
            <EnhancedButton
              label={translations[lang]?.bucketlist || 'Bucket List'}
              onClick={() => navigate('/bucketlist')}
              isVisible={isVisible}
              variant="accent"
              icon="🎯"
            />
          </div>
        </div>
      </div>
      
      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(120deg); }
          66% { transform: translateY(-5px) rotate(240deg); }
        }
        
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(10px) rotate(-120deg); }
          66% { transform: translateY(-20px) rotate(-240deg); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(2, 247, 27, 0.3); }
          50% { box-shadow: 0 0 40px rgba(2, 161, 20, 0.6), 0 0 60px rgba(2, 161, 20, 0.2); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
};

const AnimatedStatItem = ({ number, label, isVisible, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        ...styles.statItem,
        background: isHovered 
          ? `linear-gradient(135deg, ${color}15, ${color}25)` 
          : 'rgba(255, 255, 255, 0.1)',
        borderColor: isHovered ? color : 'transparent',
        // transform: isVisible ? (isHovered ? 'translateY(-8px) scale(1.05)' : 'scale(1)') : 'scale(0.8)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.statItemInner}>
        <h3 style={{
          ...styles.statNumber,
          color: isHovered ? color : '#333',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 0.3s ease'
        }}>
          {number}
        </h3>
        <p style={{
          ...styles.statLabel,
          color: isHovered ? color : '#666'
        }}>{label}</p>
      </div>
      {isHovered && (
        <div style={{
          ...styles.statShimmer,
          background: `linear-gradient(90deg, transparent, ${color}40, transparent)`
        }}></div>
      )}
    </div>
  );
};

const EnhancedButton = ({ label, onClick, disabled = false, isVisible, variant = 'primary', icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = () => {
    let baseStyle = { ...styles.enhancedButton };
    
    if (disabled) {
      return { ...baseStyle, ...styles.buttonDisabled };
    }
    
    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        baseStyle.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
        break;
      case 'secondary':
        baseStyle.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        baseStyle.boxShadow = '0 8px 32px rgba(240, 147, 251, 0.3)';
        break;
      case 'accent':
        baseStyle.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
        baseStyle.boxShadow = '0 8px 32px rgba(79, 172, 254, 0.3)';
        break;
    }
    
    if (isPressed) {
      return { 
        ...baseStyle, 
        transform: 'translateY(2px) scale(0.98)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
      };
    }
    
    if (isHovered) {
      return { 
        ...baseStyle, 
        // transform: 'translateY(-4px) scale(1.02)',
        boxShadow: baseStyle.boxShadow.replace('0.3', '0.5')
      };
    }
    
    return baseStyle;
  };

  return (
    <button
      style={{
        ...getButtonStyle(),
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      <span style={styles.buttonContent}>
        {icon && <span style={styles.buttonIcon}>{icon}</span>}
        {label}
      </span>
      {isHovered && !disabled && (
        <div style={styles.buttonRipple}></div>
      )}
    </button>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2cf5a1 0%, #58d668 75%, #00ff66 100%)',
    paddingTop: '50px',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  floatingElement: {
    position: 'absolute',
    opacity: 0.15,
  },
  circle1: {
    width: '100px',
    height: '100px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '50%',
    top: '10%',
    left: '10%',
    animation: 'float 8s ease-in-out infinite',
  },
  circle2: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
    borderRadius: '50%',
    top: '60%',
    right: '15%',
    animation: 'floatReverse 10s ease-in-out infinite',
  },
  circle3: {
    width: '120px',
    height: '120px',
    background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    borderRadius: '50%',
    bottom: '15%',
    left: '8%',
    animation: 'float 12s ease-in-out infinite',
  },
  square1: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #fa709a, #fee140)',
    borderRadius: '15px',
    top: '25%',
    right: '8%',
    animation: 'rotate 15s linear infinite',
  },
  square2: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    borderRadius: '10px',
    top: '45%',
    left: '5%',
    animation: 'rotate 18s linear infinite reverse',
  },
  triangle1: {
    width: '0',
    height: '0',
    borderLeft: '25px solid transparent',
    borderRight: '25px solid transparent',
    borderBottom: '45px solid rgba(102, 126, 234, 0.3)',
    top: '70%',
    right: '5%',
    animation: 'bounce 6s ease-in-out infinite',
  },
  triangle2: {
    width: '0',
    height: '0',
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderBottom: '35px solid rgba(240, 147, 251, 0.3)',
    top: '15%',
    right: '25%',
    animation: 'bounce 8s ease-in-out infinite reverse',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '40px',
    borderRadius: '30px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    width: '420px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    borderRadius: '30px',
    zIndex: 1,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: '30px',
    zIndex: 10,
  },
  profilePictureWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  profilePicture: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    position: 'relative',
    zIndex: 3,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  profileRing: {
    position: 'absolute',
    top: '-8px',
    left: '-8px',
    width: '156px',
    height: '156px',
    borderRadius: '50%',
    border: '3px solid rgba(2, 247, 27, 0.5)',
    animation: 'pulse 3s infinite',
    zIndex: 2,
  },
  profileGlow: {
    position: 'absolute',
    top: '-15px',
    left: '-15px',
    width: '170px',
    height: '170px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(2, 247, 27, 0.3) 0%, transparent 70%)',
    animation: 'glow 4s ease-in-out infinite',
    zIndex: 1,
  },
  name: {
    fontSize: '28px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
    position: 'relative',
    zIndex: 10,
  },
  email: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '30px',
    position: 'relative',
    zIndex: 10,
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '30px',
    gap: '20px',
    position: 'relative',
    zIndex: 10,
  },
  statItem: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '20px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    border: '1px solid transparent',
    backdropFilter: 'blur(10px)',
  },
  statItemInner: {
    position: 'relative',
    zIndex: 2,
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '800',
    marginBottom: '8px',
    transition: 'all 0.3s ease',
  },
  statLabel: {
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  statShimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    animation: 'shimmer 2s infinite',
    zIndex: 1,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '15px',
    width: '100%',
    marginTop: '10px',
    position: 'relative',
    zIndex: 10,
  },
  enhancedButton: {
    color: '#ffffff',
    border: 'none',
    borderRadius: '16px',
    padding: '14px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    backdropFilter: 'blur(10px)',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    position: 'relative',
    zIndex: 2,
  },
  buttonIcon: {
    fontSize: '16px',
  },
  buttonRipple: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    animation: 'shimmer 1.5s infinite',
    zIndex: 1,
  },
  buttonDisabled: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },
  fileInputContainer: {
    position: 'relative',
  },
  fileInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  fileInputLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px dashed rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
  },
  fileInputIcon: {
    fontSize: '18px',
  },
  toggleBtn: {
    border: 'none',
    borderRadius: '30px',
    padding: '12px 24px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '20px',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    // boxShadow: '0 0 12px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
  },
  langSeparator: {
    width: '2px',
    height: '16px',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '1px',
  },
};

export default ProfilePage;