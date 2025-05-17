import React, { useState, useEffect } from 'react';
import GlobalHeader from './GlobalHeader';
import CardWithReview from './CardWithReview.jsx';
import axios from 'axios';
import { PROFILE_INFO_ENDPOINT_URL } from '../utils/ApiHost';
import ErrorPage from './ErrorPage.jsx';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

const Bucketlist = ({ isLogged }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const { lang } = useLanguage();

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

  const handleRemoveFromWishlist = (name) => {
    setProfileInfo({
      ...profileInfo,
      countriesWishlist: profileInfo.countriesWishlist.filter((country) => country !== name),
    });
  };

  return (
    <div className="journal-container">
      <GlobalHeader isLogged={isLogged} />
      <h1>{translations[lang].bucketlist}</h1>
      <div className="content">
        {Array.from(new Set(profileInfo.countriesWishlist)).map((name, index) => (
          <CardWithReview key={index} name={name} page={"bucketlist"} onRemove={handleRemoveFromWishlist} />
        ))}
      </div>
    </div>
  );
};

export default Bucketlist;
