import { useEffect, useRef, useState } from "react";
import useFetchUser from "../hooks/useFetchUser";
import Globe from "./Globe.jsx";

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
                        <div className="despreNoi">Despre Noi</div>
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
            </div>
        </div >
    );
}
