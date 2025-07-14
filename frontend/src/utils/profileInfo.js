import axios from 'axios';

import { USER_INFO_ENDPOINT_URL } from './ApiHost';

export async function getProfileInfo() {

  try {
    const BACKEND_BASE_URL = 'https://3fd6dd54-97ff-4674-8370-5e658694e75e-dev.e1-eu-west-cdp.choreoapis.dev/globetales/backend/v1.0';

    const response = await axios.get(USER_INFO_ENDPOINT_URL, {
      withCredentials: true, // send cookies/session
    });

    // Backend sends profile_picture like "/media/user_images/xyz.png"
    // prepend backend URL so frontend img src works
    const data = response.data;

    return {
      username: data.username || 'Guest',
      email: data.email || 'Not provided',
      address: data.address || '',
      countriesVisited: data.countriesVisited || [],
      countriesWishlist: data.countriesWishlist || [],
      profilePic: data.profile_picture
        ? BACKEND_BASE_URL + data.profile_picture
        : null,
    };

  } catch (error) {
    console.error('Failed to fetch profile info:', error);
    throw error;
  }
}