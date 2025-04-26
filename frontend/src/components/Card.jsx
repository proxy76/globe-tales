import { useState, useEffect } from 'react';
import axios from 'axios';

const Card = ({ name }) => {
    const [info, setInfo] = useState(null);  // Changed from [] to null to better handle async data

    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
                // The API returns an array. We'll pick the first result.
                setInfo(response.data[0]);
            } catch (error) {
                console.error('Failed to fetch country info:', error);
            }
        };

        if (name) getInfo();
    }, [name]);

    if (!info) return <p>Loading...</p>;

    return (
        <div className='card'>
            <img src={info.flags.png} alt="" />
            <div className="name">
                <p><b>Nume</b></p>
                <p>{info.name.common}</p>
            </div>
            <div className="currencies">
                <p><b>Monedă</b></p>
                <p>{Object.values(info.currencies)[0].name}</p>
            </div>
            <div className="capital">
                <p><b>Capitală</b></p>
                <p>{info.capital?.[0]}</p>
            </div>
            <div className="languages">
                <p><b>Limbă oficială</b></p>
                <p>{Object.values(info.languages)[0]}</p>
            </div>
            <div className="population">
                <p><b>Populație</b></p>
                <p>{info.population.toLocaleString()}</p>
            </div>
            <div className="continent">
                <p><b>Continent</b></p>
                <p>{info.continents[0]}</p>
            </div>
        </div>
    );
};

export default Card;
