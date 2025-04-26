import { ADD_WISHLIST_ENDPOINT_URL, ADD_JOURNAL_ENDPOINT_URL } from "../utils/ApiHost";
import axios from "axios";
import { useState } from "react";
import Card from "./Card"; // Import the Card component

export default function Menu({ setMenuOpen, menuOpen, country, isLogged }) {
    const [cardOpened, setCardOpened] = useState(false);
    const toggleCard = () => {
        setCardOpened(!cardOpened);
    };
    const toggleMenu = () => {
        setMenuOpen(false);
    }
    console.log(isLogged)
    const add_wishlist = (e) => {
        axios.post(ADD_WISHLIST_ENDPOINT_URL, {
            country: country,
        }, {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.status);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const add_journal = (e) => {
        axios.post(ADD_JOURNAL_ENDPOINT_URL, {
            country: country,
        }, {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.status);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (

        <div className="menus">
            {menuOpen && (
            <div className="backgroundMenu">
                <div className="countryMenu">
                    <h1>{country}</h1>
                    {isLogged ? (
                    <>
                        <button onClick={(e) => add_wishlist(e)}>Add to Bucketlist</button>
                        <button onClick={(e) => add_journal(e)}>Add to Travel Journal</button>
                    </>
                    )
                    : (
                    <p>You have to login in order to add to journal or bucketlist.</p>
                    )}
                    <button onClick={toggleCard}>Show Country Card</button>
                    <button onClick={toggleMenu}>Close Menu</button>
                </div>

                {cardOpened && (
                    <Card name={country} />
                )}
            </div>
            )}
    </div>
    );
    
}