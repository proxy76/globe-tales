import { useEffect, useRef, useState } from "react";
import useFetchUser from "../hooks/useFetchUser";
import Globe from "./Globe.jsx";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";

export default function LandingPage(isLogged) {
    const [pfp, setPfp] = useState("");
    const headerRef = useRef(null);
    const [isOpened, setIsOpened] = useState(false);
    // Close dropdown when clicking outside
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target.className != 'dropdownWrapper' || e.target.className != 'profilePic') {
                setIsOpened(false);
            }
        };
        document.addEventListener("onclick", handleClickOutside);
        return () => {
            document.removeEventListener("onclick", handleClickOutside);
        };
    }, []);

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
                                console.log("Profile picture clicked!"); // Debugging
                                setIsOpened(!isOpened);
                            }}
                            ref={dropdownRef} className="dropdownWrapper" >
                            <img
                                className="profilePic"
                                src="/anonymous.png"
                                alt=""

                            />
                            {
                                isOpened && (
                                    <div className="dropdownContainer">
                                        {
                                            isLogged ? (
                                                <div className="dropdown">
                                                    <Link to='profile'>
                                                        <div className="dropdownItem">
                                                            Profile
                                                        </div>
                                                    </Link>

                                                    <Link to='logout'>
                                                        <div className="dropdownItem">
                                                            Logout
                                                        </div>
                                                    </Link>

                                                </div>
                                            ) : (
                                                <div className="dropdown">
                                                    <Link to='login'>
                                                        <div className="dropdownItem">
                                                            Login
                                                        </div>
                                                    </Link>

                                                    <Link to='register'>
                                                        <div className="dropdownItem">
                                                            Register
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
                    style={{ width: "150%", height: "1000px" }}
                >
                </div>
            </div>

            <div className="globeWrapper">
                <Globe />
            </div>

            <div className="buttonWrapper">
                <div className="txt">
                    <h2>Travel. Experience. Find Yourself!</h2>
                </div>
                <div className="btns">
                    <Link to='map'><button>World Map</button></Link>
                    <Link to='journal'><button>Travel Journal</button></Link>
                    <Link to='bucketlist'><button>Bucketlist</button></Link>
                </div>
            </div>

            <div className="infoWrapper">
                <div className="info1">
                    <a id="gen"></a>
                    <div className="text1">
                        <h1>Lorem, ipsum.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sed mollitia ipsam et asperiores ducimus voluptatibus sunt vel velit molestias doloremque inventore quidem ipsa, in dolore nesciunt alias officia quo praesentium? Quas consequuntur dolor unde natus commodi vitae quo veritatis?</p>
                    </div>
                    <div className="img1">
                        <img src={img1} alt="" />
                    </div>
                </div>
                <div className="info2">
                    <div className="img2">
                        <img src={img2} alt="" />
                    </div>
                    <div className="text2">
                        <h1>Lorem, ipsum.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sed mollitia ipsam et asperiores ducimus voluptatibus sunt vel velit molestias doloremque inventore quidem ipsa, in dolore nesciunt alias officia quo praesentium? Quas consequuntur dolor unde natus commodi vitae quo veritatis?</p>
                    </div>
                </div>
            </div>

            <div className="footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <h2>GlobeTales.</h2>
                        <p>Innovative solutions for a modern world.</p>
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
