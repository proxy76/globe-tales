import React, {
  useState,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

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
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Center the map vertically
        position: "absolute", // Ensure the map is fixed to the viewport
        top: 0, // Move the map to the very top
        left: 0, // Align the map to the left
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

      {/* Adjust the width and height of the map */}
      <ComposableMap width={800} height={400}>
        <ZoomableGroup
          center={[0, 20]} // Center the map
          zoom={1} // Fix the zoom level to 1
          translateExtent={[
            [-1000, -500], // Limit panning to the left and top
            [1000, 500], // Limit panning to the right and bottom
          ]}
          disableZoomInteraction // Disable zooming completely
        >
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
  );
};

export default React.memo(MainMap);
