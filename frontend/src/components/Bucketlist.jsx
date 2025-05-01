import React, { useState, useEffect } from 'react';
import Header from './Header';
import Card from './Card.jsx';
import CardWithReview from './CardWithReview.jsx';
import axios from 'axios';
import { PROFILE_INFO_ENDPOINT_URL } from '../utils/ApiHost';
import ErrorPage from './ErrorPage.jsx';
const Journal = ({ isLogged }) => {
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
      <Header isLogged={isLogged} />
      <h1>Your Bucketlist</h1>
      <div className="content">
        {Array.from(new Set(profileInfo.countriesWishlist)).map((name, index) => (
          <CardWithReview key={index} name={name} />
        ))}
      </div>
    </div>
  );
};

export default Journal;
