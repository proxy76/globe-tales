import { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/Card.scss';
import { REMOVE_JOURNAL_ENDPOINT_URL, REMOVE_BUCKETLIST_ENDPOINT_URL, ADD_JOURNAL_ENDPOINT_URL } from '../utils/ApiHost';

const CardWithReview = ({ name, refreshData, onRemove, page }) => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
                setInfo(response.data[0]); // Set the country info
            } catch (error) {
                console.error('Failed to fetch country info:', error);
            }
        };

        if (name) getInfo();
    }, [name]);

    if (!info) return <p>Loading...</p>;

    // Function to remove a country from the bucket list
    const handleRemoveFromBucketlist = async () => {
        try {
            const response = await axios.post(REMOVE_BUCKETLIST_ENDPOINT_URL, { country: name }, { withCredentials: true });
            if (response.data.isRemoved) {
                if (onRemove) onRemove(name); // Remove the card from the parent state
                if (refreshData) refreshData(); // Refresh parent data if provided
            }
        } catch (error) {
            console.error('Failed to remove from bucket list:', error);
        }
    };

    // Function to remove a country from the journal
    const handleRemoveFromJournal = async () => {
        try {
            const response = await axios.post(REMOVE_JOURNAL_ENDPOINT_URL, { country: name }, { withCredentials: true });
            if (response.data.isRemoved) {
                if (onRemove) onRemove(name); // Remove the card from the parent state
                if (refreshData) refreshData(); // Refresh parent data if provided
            }
        } catch (error) {
            console.error('Failed to remove from journal:', error);
        }
    };

    // Function to add a country to the journal
    const handleAddToJournal = async () => {
        try {
            const response = await axios.post(ADD_JOURNAL_ENDPOINT_URL, { country: name }, { withCredentials: true });
            if (response.data.isAdded) {
                if (refreshData) refreshData(); // Refresh parent data if provided
            }
        } catch (error) {
            console.error('Failed to add to journal:', error);
        }
    };

    return (
        <div className='card'>
            <img src={info.flags.png} alt="" />
            <div className="name">
                <p><b>Name</b></p>
                <p>{info.name.common}</p>
            </div>
            <div className="currencies">
                <p><b>Currency</b></p>
                <p>{Object.values(info.currencies)[0].name}</p>
            </div>
            <div className="capital">
                <p><b>Capital</b></p>
                <p>{info.capital?.[0]}</p>
            </div>
            <div className="languages">
                <p><b>Official Language</b></p>
                <p>{Object.values(info.languages)[0]}</p>
            </div>
            <div className="population">
                <p><b>Population</b></p>
                <p>{info.population.toLocaleString()}</p>
            </div>
            <div className="continent">
                <p><b>Continent</b></p>
                <p>{info.continents[0]}</p>
            </div>
            <div className="btns">
                {page === "bucketlist" ? (
                    <>
                        <div className="remove" onClick={handleRemoveFromBucketlist}>REMOVE</div>
                        <div className="remove" onClick={() => { handleAddToJournal(); handleRemoveFromBucketlist(); }}>VISITED</div>
                        <div className="review">REVIEW</div>
                    </>
                ) : (
                    <>
                        <div className="remove" onClick={handleRemoveFromJournal}>REMOVE</div>
                        <div className="review">REVIEW</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CardWithReview;
