import React from 'react';

import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

import "../styles/header.scss";

const Header = (isLogged) => {

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

    return (
        <>
            <div className="headerWrapper">
                <div className="headerText">
                    <div className="sections">
                        <div className="title">
                            <div className="titleLogo">
                                <img src="/logo.png" alt="" />
                            </div>
                            <div className="titleText" style={{ color: "black" }}>
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
        </>

    );
};

export default Header;
