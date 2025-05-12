import Header from "./Header";
import MainMap from "./MainMap";

const MapPage = ({isLogged}) => {
    return (
        <div className="map">
            <Header isLogged={isLogged}/>
            <MainMap isLogged = {isLogged}/>
        </div>
    )
}

export default MapPage;