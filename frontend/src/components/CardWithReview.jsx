import { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/Card.scss';
import {
  REMOVE_JOURNAL_ENDPOINT_URL,
  REMOVE_BUCKETLIST_ENDPOINT_URL,
  ADD_JOURNAL_ENDPOINT_URL,
} from '../utils/ApiHost';

const CardWithReview = ({ name, setReviewsOpened, refreshData, onRemove, page }) => {
  const [info, setInfo] = useState(null);

  // Helper function to get the correct name for RESTCountries API
  const getApiName = (name) => {
    const overrides = {
      'United States': 'usa',
      'India': 'Republic of India',
      'China': 'Zhonghua',
    };
    return overrides[name] || name;
  };

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const apiName = getApiName(name);
        const response = await axios.get(`https://restcountries.com/v3.1/name/${apiName}`);
        setInfo(response.data[0]);
      } catch (error) {
        console.error('Failed to fetch country info:', error);
      }
    };

    if (name) fetchCountryInfo();
  }, [name]);

  if (!info) return <p>Loading...</p>;

  const handleRemoveFromBucketlist = async () => {
    try {
      const response = await axios.post(
        REMOVE_BUCKETLIST_ENDPOINT_URL,
        { country: name },
        { withCredentials: true }
      );
      if (response.data.isRemoved) {
        onRemove?.(name);
        refreshData?.();
      }
    } catch (error) {
      console.error('Failed to remove from bucket list:', error);
    }
  };

  const handleRemoveFromJournal = async () => {
    try {
      const response = await axios.post(
        REMOVE_JOURNAL_ENDPOINT_URL,
        { country: name },
        { withCredentials: true }
      );
      if (response.data.isRemoved) {
        onRemove?.(name);
        refreshData?.();
      }
    } catch (error) {
      console.error('Failed to remove from journal:', error);
    }
  };

  const handleAddToJournal = async () => {
    try {
      const response = await axios.post(
        ADD_JOURNAL_ENDPOINT_URL,
        { country: name },
        { withCredentials: true }
      );
      if (response.data.isAdded) {
        refreshData?.();
      }
    } catch (error) {
      console.error('Failed to add to journal:', error);
    }
  };

  const openReviews = () => {
    setReviewsOpened?.(name);
  };

  return (
    <div className="card">
      <div className="cardContainer">
        <img src={info.flags.png} alt={`${info.name.common} flag`} />
        <div className="name">
          <p><b>Name</b></p>
          <p>{info.name.common}</p>
        </div>
        <div className="currencies">
          <p><b>Currency</b></p>
          <p>{Object.values(info.currencies)[0]?.name}</p>
        </div>
        <div className="capital">
          <p><b>Capital</b></p>
          <p>{info.capital?.[0]}</p>
        </div>
        <div className="languages">
          <p><b>Official Language</b></p>
          <p>{Object.values(info.languages)[0]}</p>
        </div>
        <div className="population">
          <p><b>Population</b></p>
          <p>{info.population.toLocaleString()}</p>
        </div>
        <div className="continent">
          <p><b>Continent</b></p>
          <p>{info.continents[0]}</p>
        </div>
        <div className="btns">
          {page === 'bucketlist' ? (
            <>
              <div className="remove" onClick={handleRemoveFromBucketlist}>REMOVE</div>
              <div
                className="remove"
                onClick={async () => {
                    await handleAddToJournal();
                    await handleRemoveFromBucketlist();
                }}
              >
                VISITED
              </div>
            </>
          ) : (
            <>
              <div className="remove" onClick={handleRemoveFromJournal}>REMOVE</div>
              <div className="review" onClick={openReviews}>REVIEW</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardWithReview;
