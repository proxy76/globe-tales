import React, {
  useState,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

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
    <div className="mainMap" style={{ minHeight: "500px", position: "relative" }}>
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

      <ComposableMap>
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
      </ComposableMap>
    </div>
  );
};

export default React.memo(MainMap);
