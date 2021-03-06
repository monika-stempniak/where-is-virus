import React, { useState, useEffect } from "react";
import { Button, IconButton, Typography, Box } from "@material-ui/core";
import styled from "styled-components";
import { get } from "lodash";

import { Container, Report } from "components";
import { getAllEvents, addEvent } from "api/eventsApi";
import { getGeocodingData } from "api/geocodeApi";

const backArrowIcon = require("../../assets/backArrow.png");

const ReportContainer = styled(Container)({
  paddingBottom: 96
});

const BackArrowIconButton = styled(IconButton)({
  display: "flex",
  justifyContent: "flex-start",
  marginLeft: 20
});

const BoxContainer = styled(Box)({
  padding: 20
});

const SortButtonsContainer = styled(BoxContainer)({
  display: "flex",
  alignItems: "center"
});

const ReportsToCheckContainer = styled(BoxContainer)({});
const AddReportContainer = styled(BoxContainer)({
  position: "fixed",
  bottom: 0,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  background: "white",
  boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.7)",
  padding: 0
});

const SortButton = styled(Button)({
  borderRadius: 20,
  height: 40,
  padding: "0 30px"
});

const LocationButton = styled(SortButton)({
  border: "1px solid #ffcc00",
  background: "#ffcc00",
  color: "white",
  margin: "0 10px",
  "&:hover": {
    border: "1px solid #ffcc00",
    background: "#ffcc00",
    color: "white",
    opacity: 0.8
  }
});

const RecentDateButton = styled(SortButton)({
  border: "1px solid white",
  boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.7)",
  background: "white",
  color: "#333333",
  "&:hover": {
    border: "1px solid white",
    boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.7)",
    background: "white",
    color: "#333333",
    opacity: 0.8
  }
});

const AddReportButtonContainer = styled(Container)({
  flexDirection: "row"
});

const AddReportButton = styled(Button)({
  background: "#3796f4",
  boxShadow: "0px 12px 30px 0px rgba(55,150,244,0.2)",
  border: 0,
  borderRadius: 20,
  color: "white",
  height: 48,
  padding: "0 30px",
  width: "80%",
  "&:hover": {
    border: 0,
    background: "#3796f4",
    color: "white",
    opacity: 0.8
  }
});

const ReportsList = ({ history }) => {
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

  const renderReportsList = () => {
    return (
      <>
        {events
          .filter(event => event.latitude && !event.confirmedBySanepid)
          .map((event, i) => {
            return <Report key={i} event={event} getAllEvents={fetchEvents} />;
          })}
      </>
    );
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const handleSortByLocation = () => {
    alert("To be done...");
  };

  const handleSortByDate = () => {
    alert("To be done...");
  };

  const handleAddNewEvent = async () => {
    const exampleAddress = prompt(
      "TEST: Please confirm or enter an example address:",
      "Warszawa, ul. Kwiatowa 6"
    );
    if (exampleAddress) {
      const address = `address=${exampleAddress.trim().replace(/ /g, "+")}`;
      const data = await getGeocodingData(address);
      const location = data ? data.results[0].geometry.location : "";
      const exampleEvent = {
        occurrenceDate: "2025-03-18T21:52:47",
        hasIllnessSymptoms: true,
        creationDate: "2025-03-18T21:52:47",
        lastUpdateDate: "2025-03-18T21:52:47",
        socialConfirmationCounter: 0,
        description: "Starszy pan - ok 70 lat z napadami duszności",
        longitude: location.lng,
        latitude: location.lat,
        confirmedBySanepid: false,
        inQuarantine: true
      };

      const response = addEvent(exampleEvent);
      // TODO:
      typeof response === Object && fetchEvents();
    }
  };

  return (
    <>
      <ReportContainer>
        <BackArrowIconButton
          aria-label="back"
          size="small"
          onClick={handleGoBack}
        >
          <img src={backArrowIcon} alt="back button" />
        </BackArrowIconButton>
        <SortButtonsContainer>
          <Typography>Sort by:</Typography>
          <LocationButton variant="outlined" onClick={handleSortByLocation}>
            Closest Location
          </LocationButton>
          <RecentDateButton variant="outlined" onClick={handleSortByDate}>
            Recent Date
          </RecentDateButton>
        </SortButtonsContainer>
        <ReportsToCheckContainer>
          <Typography>Reports to check:</Typography>
          {renderReportsList()}
        </ReportsToCheckContainer>
      </ReportContainer>
      <AddReportContainer>
        <AddReportButtonContainer center>
          <AddReportButton fullWidth onClick={handleAddNewEvent}>
            Add
          </AddReportButton>
        </AddReportButtonContainer>
      </AddReportContainer>
    </>
  );
};

export default ReportsList;
