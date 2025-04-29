import React, { useEffect } from 'react';
import '../styles/ProfilePage.scss';
import axios from 'axios';
import { PROFILE_INFO_ENDPOINT_URL } from '../utils/ApiHost';
import { useState } from 'react';

import pfp from '../assets/anonymous.png';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';

const ProfilePage = () => {

  const [profileInfo, setProfileInfo] = useState([]);
  const navigate = useNavigate();
  const getInfo = () => {
    axios.get(PROFILE_INFO_ENDPOINT_URL, { withCredentials: true })
      .then(response => {
        setProfileInfo(response.data);
        console.log(response.data.countriesVisited);
        console.log("Visited countries:", response.data.countriesVisited?.length || 0);
      })
      .catch(error => {
        console.error('Failed to fetch profile info:', error);
      });
  };
  useEffect(() => {
    getInfo();
  }
    , []);
  const user = {
    name: profileInfo.username,
    email: profileInfo.email,
    countriesVisited: profileInfo.countriesVisited,
    countriesWishlisted: profileInfo.countriesWishlist,
    // profilePic: profileInfo.profile_picture,
  };
  const clickJ = () => {
    console.log("Navigating to /journal");
    navigate('/journal');
  }
  return (
    <>
      <Header />
      <div className="profile-container">
        <img
          src={user.profilePic? user.profilePic : pfp}
          className="profile-picture"
        />
        <div className="profile-details">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Countries Visited: {user.countriesVisited?.length || 0}</p>
          <p>Wishlist: {user.countriesWishlisted?.length || 0}</p>
        </div>
      </div>

      <div className="btn-container">
        <div className="btns">
          <Link to='/journal'><button onClick={clickJ}>Travel Journal</button></Link>
          <Link to='/bucketlist'><button>Bucketlist</button></Link>
        </div>
      </div>
    </>

  );
};

export default ProfilePage;
