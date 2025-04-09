import { useEffect, useRef, useState } from "react";
import useFetchUser from "../hooks/useFetchUser";
import Globe from "./Globe.jsx";
import { FaArrowAltCircleDown } from "react-icons/fa";

import img1 from "../assets/img1.png";

export default function LandingPage() {
    const [pfp, setPfp] = useState("");
    const headerRef = useRef(null);

    useEffect(() => {
        /* useFetchUser().then((response) => {
            setPfp(response.data.profile_picture);
        }) */
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
                            World Info
                        </div>
                        <div>
                            <img className="profilePic" src="/anonymous.png" alt="" />
                        </div>
                    </div>
                </div>
                <div
                    ref={headerRef}
                    className="header finisher-header"
                    style={{ width: "150%", height: "700px" }}
                >

                </div>
            </div>


            <div className="globeWrapper">
                <Globe />
                <a href='#gen'><FaArrowAltCircleDown size={50} className="arrowDown" color={'#3feab5'} /></a>
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
                        <img src={img1} alt="" />
                    </div>
                    
                    <div className="text2">
                        <h1>Lorem, ipsum.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sed mollitia ipsam et asperiores ducimus voluptatibus sunt vel velit molestias doloremque inventore quidem ipsa, in dolore nesciunt alias officia quo praesentium? Quas consequuntur dolor unde natus commodi vitae quo veritatis?</p>
                    </div>



                </div>

            </div>

            <div class="footer">
            <div class="footer-container">
                <div class="footer-logo">
                <h2>YourBrand</h2>
                <p>Innovative solutions for a modern world.</p>
                </div>

                <div class="footer-social">
                <h4>Follow Us</h4>
                <ul>
                    <li><a href="#" class="social-icon facebook">Facebook</a></li>
                    <li><a href="#" class="social-icon twitter">Twitter</a></li>
                    <li><a href="#" class="social-icon instagram">Instagram</a></li>
                    <li><a href="#" class="social-icon linkedin">LinkedIn</a></li>
                </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2025 YourBrand. All rights reserved.</p>
            </div>
            </div>
        </div >
    );
}
