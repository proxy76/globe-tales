import { ADD_WISHLIST_ENDPOINT_URL, ADD_JOURNAL_ENDPOINT_URL } from "../utils/ApiHost";
import axios from 'axios';
export default function Menu({ country }) {

    const add_wishlist = (e) => {
        axios.post(ADD_WISHLIST_ENDPOINT_URL, {
            country: country
        }, {
            withCredentials: true
        })
            .then((response) => {
                console.log(response.status);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const add_journal = (e) => {
        axios.post(ADD_JOURNAL_ENDPOINT_URL, {
            country: country
        }, {
            withCredentials: true
        })
            .then((response) => {
                console.log(response.status);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <div className="backgroundMenu">
            <div className="countryMenu">
                <h1>{country}</h1>

                <button onClick={(e) => add_wishlist(e)}>Add to Bucketlist</button>
                <button onClick={(e) => add_journal(e)}>Add to Travel Journal</button>

            </div>
        </div>

    );
}