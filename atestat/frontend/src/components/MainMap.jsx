import React, { useState, lazy, Suspense, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// Lazy-load Menu component only when needed
const Menu = lazy(() => import("./Menu"));

const MainMap = ({ isLogged }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Memoized styles to avoid recreating objects on each render
  const styles = useMemo(() => ({
    default: {
      fill: "#D6D6DA",
      stroke: "#000",
      outline: "none",
    },
    hover: {
      fill: "#A8A8A8",
      stroke: "#000",
      outline: "none",
    },
    pressed: {
      fill: "#FF5733",
      stroke: "#000",
      outline: "none",
    },
    selected: {
      fill: "#FF5733",
      stroke: "#000",
      outline: "none",
    }
  }), []);

  return (
    <div className="mainMap" style={{ minHeight: "500px", position: "relative" }}>
      {/* Lazy-loaded menu for performance */}
      <Suspense fallback={null}>
        {selectedCountry && (
          <Menu
            setMenuOpen={setMenuOpen}
            menuOpen={menuOpen}
            country={countryName}
            isLogged={isLogged}
          />
        )}
      </Suspense>

      <ComposableMap>
        <Geographies geography="/features.json">
          {({ geographies }) =>
            geographies.map((geo) => {
              const isSelected = selectedCountry === geo.id;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    setSelectedCountry(geo.id);
                    setCountryName(geo.properties.name);
                    setMenuOpen(true);
                  }}
                  style={{
                    default: isSelected ? styles.selected : styles.default,
                    hover: styles.hover,
                    pressed: styles.pressed,
                  }}
                  onFocus={(e) => e.target.blur()} // Remove keyboard outline
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default React.memo(MainMap);
