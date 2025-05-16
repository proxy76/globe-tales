import React, {
  useState,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

import "../styles/map.scss";
const Menu = lazy(() => import("./Menu"));
const GEO_URL = "/features.json";

const MainMap = ({ isLogged }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const styles = useMemo(() => ({
    default: { fill: "#D6D6DA", stroke: "#000", outline: "none" },
    hover: { fill: "#A8A8A8", stroke: "#000", outline: "none" },
    pressed: { fill: "#FF5733", stroke: "#000", outline: "none" },
    selected: { fill: "#FF5733", stroke: "#000", outline: "none" },
  }), []);

  const handleClick = useCallback((geo) => {
    setSelectedCountry(() => geo.id);
    setCountryName(() => geo.properties.name);
    setMenuOpen(() => true);
  }, []);

  return (
    <div
      className="mainMap"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Center the map vertically
        overflow: "hidden", // Prevent scrolling
      }}
    >
      <Suspense fallback={<div className="menu-fallback">Loading menu…</div>}>
        {selectedCountry && (
          <Menu
            setMenuOpen={setMenuOpen}
            menuOpen={menuOpen}
            country={countryName}
            isLogged={isLogged}
          />
        )}
      </Suspense>
{/* uhew */}
      {/* Adjust the width and height of the map */}
      <div className="mapContainer">
        <ComposableMap className="map">
          <ZoomableGroup center={[0, 20]} zoom={1}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isSelected = selectedCountry === geo.id;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleClick(geo)}
                      style={{
                        default: isSelected ? styles.selected : styles.default,
                        hover: styles.hover,
                        pressed: styles.pressed,
                      }}
                      onFocus={(e) => e.target.blur()}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        </div>
    </div>
  );
};

export default React.memo(MainMap);
