import React from 'react';
import '../styles/ProfilePage.scss';

const ProfilePage = () => {
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    countriesVisited: 25,
    countriesWishlisted: 40,
    profilePic: '../assets/profile-pic.jpg', // Replace with actual image path
  };

  return (
    <>
      <div className="profile-container">
        <img
          src={user.profilePic}
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-details">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Countries Visited: {user.countriesVisited}</p>
          <p>Wishlist: {user.countriesWishlisted}</p>
        </div>
      </div>

      <div className="btn-container">
        <div className="btns">
          <button>Travel Journal</button>
          <button>Bucketlist</button>
        </div>
      </div>
    </>

  );
};

export default ProfilePage;
