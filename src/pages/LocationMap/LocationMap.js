import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker
} from "@react-google-maps/api";

import { Container } from "components";
import { GOOGLE_MAPS_API_KEY, MARKERS } from "shared/constants";

const mapContainerStyle = {
  height: "600px",
  width: "1000px"
};

const locations = [
  { lat: 52.237049, lng: 21.017532 },
  { lat: 51.7592, lng: 19.456 },
  { lat: 51.3753, lng: 20.2788 },
  { lat: 51.6176, lng: 20.5766 },
  { lat: 51.5312, lng: 20.0086 },
  { lat: 54.352, lng: 18.6466 },
  { lat: 54.5189, lng: 18.5305 }
];

const options = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
};

const LocationMap = () => {
  const [currentLatLng, setCurrentLatLng] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    showCurrentLocation();
  }, []);

  const showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        setCurrentLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      console.log("error");
    }
  };

  return (
    <Container>
      <LoadScript id="script-loader" googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          id="marker-example"
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={currentLatLng}
        >
          <Marker position={currentLatLng} icon={MARKERS.CURRENT_USER} />
          <MarkerClusterer options={options}>
            {clusterer =>
              locations.map((location, i) => (
                <Marker
                  key={i}
                  position={location}
                  clusterer={clusterer}
                  icon={MARKERS.CONFIRMED}
                />
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript>
    </Container>
  );
};

export default LocationMap;
