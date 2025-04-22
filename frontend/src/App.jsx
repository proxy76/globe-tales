import { useState, useEffect } from 'react'
import './styles/main.scss';
import MainMap from './components/MainMap';
import LandingPage from './components/LandingPage';
import React from "react";
import Profile from './components/Profile';
import Journal from './components/Journal';
import Bucketlist from './components/Bucketlist';
import {CHECK_LOGIN_ENDPOINT_URL} from './utils/ApiHost'
import axios from 'axios';

import {
  BrowserRouter,
  Route,
  Routes,
  Link
} from "react-router-dom";


import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(CHECK_LOGIN_ENDPOINT_URL, {
                withCredentials: true, // Include cookies in the request
            });
            setIsLogged(response.data.isLogged);
        } catch (error) {
            console.error("Error checking login status:", error);
            setIsLogged(false); // Default to false if there's an error
        }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className='container'>

      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<LandingPage isLogged={isLogged} setIsLogged={setIsLogged} />} />
          <Route path="/map" element={<MainMap />} />
          <Route path="/login" element={<LoginPage setIsLogged={setIsLogged}/>} />
          <Route path="/register" element={<RegisterPage setIsLogged={setIsLogged} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/bucketlist" element={<Bucketlist />} />
        </Routes>
      </BrowserRouter>
      { /*<Footer /> */}


    </div>
  )
}

export default App
