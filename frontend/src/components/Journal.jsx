import React, { useState, useEffect } from 'react';
import Header from './Header';
import Card from './Card.jsx';
import axios from 'axios';
import { PROFILE_INFO_ENDPOINT_URL } from '../utils/ApiHost';

import '../styles/journalPage.scss';
import ErrorPage from './ErrorPage.jsx';

const Journal = () => {
  const [profileInfo, setProfileInfo] = useState(null); 

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(PROFILE_INFO_ENDPOINT_URL, { withCredentials: true });
        setProfileInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch profile info:', error);
      }
    };

    getInfo();
  }, []);

  if (!profileInfo) return <ErrorPage />;

  return (
    <div className="journal-container">
      <Header />
      <h1>Your Journal</h1>
      <div className="content">
        {Array.from(new Set(profileInfo.countriesVisited)).map((name, index) => (
          <Card key={index} name={name} />
        ))}
      </div>
    </div>
  );
};

export default Journal;
