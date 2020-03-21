import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker
} from "@react-google-maps/api";
import { get } from "lodash";
import { Button, Box } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

import { GOOGLE_MAPS_API_KEY, MARKERS } from "shared/constants";
import { Container, Title } from "components";
import { getAllEvents } from "api/eventsApi";

const ButtonContainer = styled(Box)({
  marginTop: 20,
  width: "1000px",
  display: "flex"
});

const MapButton = styled(Button)({
  border: 0,
  borderRadius: 20,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px"
});

const NotificationButton = styled(MapButton)({
  background: "#ffcc00",
  marginRight: 20,
  "&:hover": {
    background: "#ffcc00",
    opacity: 0.8
  }
});

const ReportButton = styled(MapButton)({
  background: "#ff2d55",
  "&:hover": {
    background: "#ff2d55",
    opacity: 0.8
  }
});

const mapContainerStyle = {
  height: "600px",
  width: "1000px"
};

// const locations = [
//   { lat: 52.237049, lng: 21.017532 },
//   { lat: 51.7592, lng: 19.456 },
//   { lat: 51.3753, lng: 20.2788 },
//   { lat: 51.6176, lng: 20.5766 },
//   { lat: 51.5312, lng: 20.0086 },
//   { lat: 54.352, lng: 18.6466 },
//   { lat: 54.5189, lng: 18.5305 }
// ];

const options = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
};

const LocationMap = props => {
  const [currentLatLng, setCurrentLatLng] = useState({ lat: 0, lng: 0 });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    showCurrentLocation();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getAllEvents();
    const allEvents = get(data, "allEvents", []);
    setEvents(allEvents);
    console.log(allEvents);
  };

  const showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      console.error("error");
    }
  };

  const handleOpenReport = () => {
    props.history.push("/report");
  };

  return (
    <>
      <Container center>
        <Title align="center" marginTop={20} marginBottom={40}>
          Where is Virus?
        </Title>
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
                events.map(({ latitude, longitude, confirmedBySanepid }, i) => (
                  <Marker
                    key={i}
                    position={{ lat: longitude, lng: latitude }}
                    clusterer={clusterer}
                    icon={
                      confirmedBySanepid
                        ? MARKERS.CONFIRMED
                        : MARKERS.NOT_CONFIRMED
                    }
                  />
                ))
              }
            </MarkerClusterer>
          </GoogleMap>
        </LoadScript>
        <ButtonContainer>
          <NotificationButton disabled={false} fullWidth>
            Notifications
          </NotificationButton>
          <ReportButton disabled={false} fullWidth onClick={handleOpenReport}>
            Report Virus
          </ReportButton>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default LocationMap;
