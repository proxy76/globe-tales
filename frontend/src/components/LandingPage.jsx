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



            <div className="textInfoWrapper">

                <div className="textInfo1">
                    <h1 className="textInfoTitle">

                        Cum să utilizezi aplicația noastră?
                    </h1>
                    <div className="textInfoContent">
                        <a id='gen' />
                        <p className="text">
                            Aplicația noastră oferă o interfață prietenoasă și ușor de utilizat. Poți naviga prin diferite secțiuni pentru a descoperi informații despre diverse țări, culturi și atracții turistice. De asemenea, poți salva favoritele tale.
                        </p>
                        <img className="textImage" src={img1}/>
                    </div>
                </div>
                <div className="textInfo2">

                    <h1 className="textInfoTitle">                        Cum să utilizezi aplicația noastră?
                    </h1>

                    <div className="textInfoContent">
                        Aplicația noastră oferă o interfață prietenoasă și ușor de utilizat. Poți naviga prin diferite secțiuni pentru a descoperi informații despre diverse țări, culturi și atracții turistice. De asemenea, poți salva favoritele tale.
                    </div>
                </div>

            </div>
        </div >
    );
}
