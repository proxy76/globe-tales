export default function Menu({ country }) {
    return (
        <div className="backgroundMenu">
            <div className="countryMenu">
                <h1>{country}</h1>

                <button>Add to Bucketlist</button>
                <button>Add to Travel Journal</button>

            </div>
        </div>

    );
}