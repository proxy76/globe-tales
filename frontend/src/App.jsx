import { useState, useEffect } from 'react'
import './styles/main.scss';
import MainMap from './components/MainMap';
import LandingPage from './components/LandingPage';
import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  /* useEffect(() => {
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(CHECK_LOGIN_ENDPOINT_URL, {
                withCredentials: true, 
            });
            setIsLogged(response.data.isLogged);
        } catch (error) {
            console.error("Error checking login status:", error);
            setIsLogged(false); 
        }
    };


    checkLoginStatus();
}, []);
 
*/
  return (
    <div className='container'>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<MainMap />} />
      </Routes>
    </BrowserRouter>
    { /*<Footer /> */}
      
      
    </div>
  )
}

export default App
