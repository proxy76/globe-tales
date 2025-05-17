import React, { useState, useEffect } from 'react';
import GlobalHeader from './GlobalHeader';
import CardWithReview from './CardWithReview.jsx';
import axios from 'axios';
import { PROFILE_INFO_ENDPOINT_URL } from '../utils/ApiHost';
import '../styles/journalPage.scss';
import ErrorPage from './ErrorPage.jsx';
import ReviewModal from './ReviewModal.jsx';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import { useLocation } from 'react-router-dom';

const Journal = ({ isLogged }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [reviewsOpened, setReviewsOpened] = useState('');
  const { lang } = useLanguage();
  const location = useLocation();
  useEffect(() => {
    if (!location.search.includes("reloaded=1")) {
      window.location.replace(location.pathname + "?reloaded=1");
    } else {
      // Ascunde parametru după reload
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);
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

  const handleRemoveFromJournal = (name) => {
    setProfileInfo({
      ...profileInfo,
      countriesVisited: profileInfo.countriesVisited.filter((country) => country !== name),
    });
  };

  return (
    <div className="journal-container">
      <GlobalHeader isLogged={isLogged} />
      <h1>{translations[lang].yourJournal}</h1>
      <div className="content">
        {reviewsOpened &&
          <ReviewModal reviewsOpened={reviewsOpened} setReviewsOpened={setReviewsOpened} isLogged={isLogged} />
        }
        {Array.from(new Set(profileInfo.countriesVisited)).map((name, index) => (
          <CardWithReview key={index} name={name} setReviewsOpened={setReviewsOpened} page={"journal"} onRemove={handleRemoveFromJournal} />
        ))}
      </div>
    </div>
  );
};

export default Journal;
