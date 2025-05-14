import GlobalHeader from "./GlobalHeader";
import MainMap from "./MainMap";

const MapPage = ({isLogged}) => {
    return (
        <div className="map">
            <GlobalHeader isLogged={isLogged}/>
            <MainMap isLogged = {isLogged}/>
        </div>
    )
}

export default MapPage;