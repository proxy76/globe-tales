import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

import "../styles/header.scss";

import axios from 'axios';
import { LOGOUT_ENDPOINT_URL } from '../utils/ApiHost.js';
import { getProfileInfo } from '../utils/profileInfo.js';
import pfp from '../assets/anonymous.png';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

const GlobalHeader = ({ isLogged }) => {
  const headerRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    getProfileInfo()
      .then(data => setProfilePic(data.profilePic))
      .catch(() => setProfilePic('/anonymous.png'));
  }, []);

  // Close dropdown when clicking outside
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.className !== 'dropdownWrapper' && e.target.className !== 'profilePic') {
        setIsOpened(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    axios.post(LOGOUT_ENDPOINT_URL, {}, { withCredentials: true })
      .then(() => window.location.pathname = '/');
  };

  return (
    <div className="headerWrapper">
      <div className="headerText">
        <div className="sections">
          <div className="title">
            <div className="titleLogo">
              <img src="/logo.png" alt="" />
            </div>
            <div className="titleText">
              <a href='/'>GlobeTales.</a>
            </div>
          </div>
          <div style={{ marginLeft: "auto", marginRight: "1rem" }}>
            <select value={lang} onChange={e => setLang(e.target.value)}>
              <option value="ro">Română</option>
              <option value="en">English</option>
            </select>
          </div>
          <div
            onClick={() => setIsOpened(!isOpened)}
            ref={dropdownRef}
            className="dropdownWrapper"
          >
            <img
              className="profilePic"
              src={profilePic || pfp}
              alt=""
              onError={e => { e.target.onerror = null; e.target.src = pfp }}
            />
            {isOpened && (
              <div className="dropdownContainer">
                {isLogged ? (
                  <div className="dropdown">
                    <Link to='/profile'>
                      <div className="dropdownItem">{translations[lang].profile}</div>
                    </Link>
                    <div onClick={handleLogout} className="dropdownItem">
                      {translations[lang].logout}
                    </div>
                  </div>
                ) : (
                  <div className="dropdown">
                    <Link to='/login'>
                      <div className="dropdownItem">{translations[lang].login}</div>
                    </Link>
                    <Link to='/register'>
                      <div className="dropdownItem">{translations[lang].register}</div>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div ref={headerRef} className="header finisher-header" style={{ width: "150%", height: "1000px" }}></div>
    </div>
  );
};

export default GlobalHeader;
