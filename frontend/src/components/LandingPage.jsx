﻿﻿import { useEffect, useRef, useState } from "react";
import useFetchUser from "../hooks/useFetchUser";
import Globe from "./Globe.jsx";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { LOGOUT_ENDPOINT_URL } from '../utils/ApiHost.js';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";

import pfp from '../assets/anonymous.png';
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

export default function LandingPage({ profilePic, isLogged, setIsLogged }) {
    const headerRef = useRef(null);
    const [isOpened, setIsOpened] = useState(false);
    const dropdownRef = useRef(null);
    const { lang } = useLanguage();
    const location = useLocation();
    
    useEffect(() => {
        if (!location.search.includes("reloaded=1")) {
            window.location.replace(location.pathname + "?reloaded=1");
        } else {
            window.history.replaceState({}, "", location.pathname);
        }
    }, [location]);
    
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target.className !== 'dropdownWrapper' && e.target.className !== 'profilePic') {
                setIsOpened(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();

        axios.post(LOGOUT_ENDPOINT_URL, {}, { withCredentials: true })
            .then((response) => {
                setIsLogged(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
            });
        window.location.reload();
    };

    useEffect(() => {
        const loadFinisherHeader = async () => {
            const script = document.createElement("script");
            script.src = "/finisher-header.es5.min.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                if (window.FinisherHeader && headerRef.current) {
                    new window.FinisherHeader({
                        "count": 12,
                        "size": {
                            "min": 1300,
                            "max": 1500,
                            "pulse": 0
                        },
                        "speed": {
                            "x": {
                                "min": 0,
                                "max": 1
                            },
                            "y": {
                                "min": 0,
                                "max": 1
                            }
                        },
                        "colors": {
                            "background": "#61eea9",
                            "particles": [
                                "#1cff62",
                                "#231efe"
                            ]
                        },
                        "blending": "lighten",
                        "opacity": {
                            "center": 0.55,
                            "edge": 0.05
                        },
                        "skew": -2,
                        "shapes": [
                            "c"
                        ]
                    });
                }
            };
        };

        loadFinisherHeader();
    }, []);

    useEffect(() => {
        (function (d, t) {
            const v = d.createElement(t);
            const s = d.getElementsByTagName(t)[0];
            v.onload = function () {
                window.voiceflow.chat.load({
                    verify: { projectID: '664913a0c40987a6e3806d50' },
                    url: 'https://general-runtime.voiceflow.com',
                    versionID: 'production',
                    voice: {
                        url: "https://runtime-api.voiceflow.com"
                    }
                });
            };
            v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
            v.type = "text/javascript";
            s.parentNode.insertBefore(v, s);
        })(document, 'script');
    }, []);
    
    return (
        <div className="pageWrapper">
            <div className="headerWrapper">
                <div className="headerText">
                    <div className="sections">
                        <div className="title">
                            <div className="titleLogo">
                                <img src="/logo.png" alt="" />
                            </div>
                            <div className="titleText">
                                GlobeTales.
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                console.log("Profile picture clicked!"); 
                                setIsOpened(!isOpened);
                            }}
                            ref={dropdownRef} className="dropdownWrapper" >
                            <img
                                className="profilePic"
                                src={profilePic}
                                alt=""
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = pfp
                                }}
                            />
                            {
                                isOpened && (
                                    <div className="dropdownContainer">
                                        {
                                            isLogged ? (
                                                <div className="dropdown">
                                                    <Link to='profile'>
                                                        <div className="dropdownItem">
                                                        {translations[lang].profile}
                                                        </div>
                                                    </Link>

                                                    <div onClick={(e) => handleLogout(e)} className="dropdownItem">
                                                        {translations[lang].logout}
                                                    </div>

                                                </div>
                                            ) : (
                                                <div className="dropdown">
                                                    <Link to='login'>
                                                        <div className="dropdownItem">
                                                        {translations[lang].login}
                                                        </div>
                                                    </Link>

                                                    <Link to='register'>
                                                        <div className="dropdownItem">
                                                        {translations[lang].register}
                                                        </div>
                                                    </Link>

                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div
                    ref={headerRef}
                    className="header finisher-header"
                    style={{ width: "100%", height: "1000px" }}
                >
                </div>
            </div>

            <motion.div 
                className="globeWrapper"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <Globe />
            </motion.div>

            <motion.div 
                className="buttonWrapper"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
                <div className="txt">
                    <h2>{translations[lang].travelExperience}</h2>
                </div>
                <div className="btns btnsLanding">
                    <Link to='map'><button>{translations[lang].worldMap}</button></Link>
                    <Link to='journal'><button>{translations[lang].travelJournal}</button></Link>
                    <Link to='bucketlist'><button>{translations[lang].bucketlist}</button></Link>
                </div>
                <div className="btns btnsLanding single-btn">
                    <Link to='social'><button className="wide-btn">{translations[lang].socialFeed}</button></Link>
                </div>
            </motion.div>
            <div className="infoWrapper">
                <motion.div 
                    className="infoCard card1"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="cardContent">
                        <div className="cardImage">
                            <img src={img1} alt="Travel Planning" />
                        </div>
                        <motion.div 
                            className="cardText"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2>{translations[lang].chooseWhere}</h2>
                            <p>{translations[lang].chooseWhereDesc}</p>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div 
                    className="infoCard card2"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <div className="cardContent reverse">
                        <div className="cardImage">
                            <img src={img2} alt="Interactive Map" />
                        </div>
                        <motion.div 
                            className="cardText"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2>{translations[lang].useWhatWeOffer}</h2>
                            <p>{translations[lang].useWhatWeOfferDesc}</p>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div 
                    className="infoCard card3"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <div className="cardContent">
                        <div className="cardImage">
                            <img src={img1} alt="Social Community" />
                        </div>
                        <motion.div 
                            className="cardText"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2>{translations[lang].connectWithTravelers}</h2>
                            <p>{translations[lang].connectWithTravelersDesc}</p>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div 
                    className="infoCard card4"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    <div className="cardContent reverse">
                        <div className="cardImage">
                            <img src={img2} alt="Country Information" />
                        </div>
                        <motion.div 
                            className="cardText"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2>{translations[lang].exploreCountries}</h2>
                            <p>{translations[lang].exploreCountriesDesc}</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <div className="footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <h2>GlobeTales.</h2>
                        <p>{translations[lang].travelExperience}</p>
                    </div>
                    <div className="footer-social">
                        <h4>Follow Us</h4>
                        <ul>
                            <li><a href="#" className="social-icon facebook">Facebook</a></li>
                            <li><a href="#" className="social-icon twitter">Twitter</a></li>
                            <li><a href="#" className="social-icon instagram">Instagram</a></li>
                            <li><a href="#" className="social-icon linkedin">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 GlobeTales. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}