import { ADD_WISHLIST_ENDPOINT_URL, ADD_JOURNAL_ENDPOINT_URL } from "../utils/ApiHost";
import axios from "axios";
import { useState } from "react";

export default function Menu({ country }) {
    // const [generatedText, setGeneratedText] = useState(""); // State to store the generated text

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

    // const generateText = async () => {
    //     try {
    //         const response = await axios.post(
    //             "http://127.0.0.1:8000/generate_description/",
    //             { country: country },
    //             { headers: { "Content-Type": "application/json" } }
    //         );
    //         setGeneratedText(response.data.description); // Update the state with the generated text
    //     } catch (error) {
    //         console.error("Error generating text:", error);
    //     }
    // };

    return (
        <div className="backgroundMenu">
            <div className="countryMenu">
                <h1>{country}</h1>

                <button onClick={(e) => add_wishlist(e)}>Add to Bucketlist</button>
                <button onClick={(e) => add_journal(e)}>Add to Travel Journal</button>
                {/* <button onClick={generateText}>Generate Description</button> */}

                {/* Display the generated text below the country's name
                {generatedText && (
                    <p className="generated-text">{generatedText}</p>
                )} */}
            </div>
        </div>
    );
}