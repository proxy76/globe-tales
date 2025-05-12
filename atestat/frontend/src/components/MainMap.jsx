import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Menu from './Menu';

const MainMap = ({isLogged}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="mainMap">
      <div>
        {selectedCountry && <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} country={countryName} isLogged={isLogged}/>}
      </div>
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
                    default: {
                      fill: isSelected ? "#FF5733" : "#D6D6DA", // Highlight selected country
                      stroke: "#000",
                      outline: "none",
                    },
                    hover: {
                      fill: "#A8A8A8", // Change color on hover
                      stroke: "#000",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#FF5733", // Keep the selected color when pressed
                      stroke: "#000",
                      outline: "none",
                    },
                  }}
                  onFocus={(e) => e.target.blur()} // Prevents focus outline
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MainMap;
