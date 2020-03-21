import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import { get } from "lodash";
import { Button, Box, Typography } from "@material-ui/core";
import styled from "styled-components";

import { GOOGLE_MAPS, MARKERS } from "shared/constants";
import { Container, Title } from "components";
import { getAllEvents } from "api/eventsApi";
import { getGeocodingData } from "api/geocodeApi";

const confirmedIcon = require("../../assets/confirmed.png");

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

const Location = styled(Typography)({
  fontWeight: "bold",
  color: "#333333"
});

const Description = styled(Typography)({
  color: "#999999",
  fontSize: 12
});

const TestInfo = styled(Typography)(props => ({
  color: props.textColor,
  fontSize: 12,
  paddingTop: 10
}));

const InfoWindowContainer = styled(InfoWindow)({
  position: "relative"
});

const InfoWindowContent = styled.div(() => ({
  padding: 10
}));

const ConfirmationIcon = styled.img(() => ({
  position: "absolute",
  top: 0,
  right: 20
}));

const mapContainerStyle = {
  height: "600px",
  width: "1000px"
};

const LocationMap = props => {
  const [currentLatLng, setCurrentLatLng] = useState({ lat: 0, lng: 0 });
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    showCurrentLocation();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getAllEvents();
    const allEvents = get(data, "allEvents", []);
    const filteredEvents = allEvents.filter(event => !!event.longitude);
    setEvents(filteredEvents);
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

  const handleMouseOver = async event => {
    const latlng = `latlng=${event.longitude},${event.latitude}`;
    const data = await getGeocodingData(latlng);
    const location = data ? data.results[0].formatted_address : "";
    const hoveredOverEvent = {
      ...event,
      location,
      color: event.confirmedBySanepid ? "#ff2d55" : "#ffcc00"
    };
    setActiveEvent(hoveredOverEvent);
  };

  const handleMouseOut = () => {
    setActiveEvent(null);
  };

  return (
    <>
      <Container center>
        <Title align="center" marginTop={20} marginBottom={40}>
          Where is Virus?
        </Title>
        <LoadScript id="script-loader" googleMapsApiKey={GOOGLE_MAPS.API_KEY}>
          <GoogleMap
            id="marker-example"
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={currentLatLng}
          >
            <Marker position={currentLatLng} icon={MARKERS.CURRENT_USER} />
            {events.map((event, i) => (
              <Marker
                key={i}
                position={{ lat: event.longitude, lng: event.latitude }}
                icon={
                  event.confirmedBySanepid
                    ? MARKERS.CONFIRMED
                    : MARKERS.NOT_CONFIRMED
                }
                onMouseOver={() => handleMouseOver(event)}
                onMouseOut={handleMouseOut}
              />
            ))}
            {activeEvent && (
              <InfoWindowContainer
                position={{
                  lat: activeEvent.longitude,
                  lng: activeEvent.latitude
                }}
              >
                <InfoWindowContent>
                  {activeEvent.confirmedBySanepid && (
                    <ConfirmationIcon
                      src={confirmedIcon}
                      alt="Confirmed by SANEPID"
                    />
                  )}
                  <Location>{activeEvent.location}</Location>
                  <Description>{activeEvent.description}</Description>
                  <TestInfo textColor={activeEvent.color}>
                    {`Corona Virus Test:
                    ${activeEvent.confirmedBySanepid ? "YES" : "NO"}`}
                  </TestInfo>
                </InfoWindowContent>
              </InfoWindowContainer>
            )}
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
