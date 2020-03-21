import React from "react";
import { Button, IconButton, Typography, Box } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

import { Container, Report } from "components";
const backArrowIcon = require("../../assets/backArrow.png");

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
const AddReportContainer = styled(BoxContainer)({});

const DialogButton = styled(Button)({
  border: "1px solid #ff2d55",
  borderRadius: 20,
  color: " #ff2d55",
  height: 40,
  padding: "0 30px",
  "&:hover": {
    border: "1px solid #ff2d55",
    color: " #ff2d55",
    background: "white"
  }
});

const LocationButton = styled(DialogButton)({
  margin: "0 10px"
});

const DatePostedButton = styled(DialogButton)({});

const AddReportButton = styled(Button)({
  background: "linear-gradient(45deg, #ff2d55 30%, #ffcc00 90%)",
  border: 0,
  borderRadius: 20,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px"
});

const ReportsList = ({ open, close }) => {
  const reportItems = [
    {
      location: "location",
      date: "date",
      description: "Description"
    },
    {
      location: "location",
      date: "date",
      description: "Description"
    }
  ];

  const renderReportsList = () => {
    return (
      <>
        {reportItems.map(entry => {
          return <Report entry={entry} />;
        })}
      </>
    );
  };

  return (
    <Container>
      <BackArrowIconButton aria-label="back" size="small">
        <img src={backArrowIcon} alt="back button" />
      </BackArrowIconButton>
      <SortButtonsContainer>
        <Typography>Sort by:</Typography>
        <LocationButton type="text" disabled={false} variant="outlined">
          Location
        </LocationButton>
        <DatePostedButton type="text" disabled={false} variant="outlined">
          Date posted
        </DatePostedButton>
      </SortButtonsContainer>
      <ReportsToCheckContainer>
        <Typography>Reports to check:</Typography>
        {renderReportsList()}
      </ReportsToCheckContainer>
      <AddReportContainer>
        <AddReportButton
          type="submit"
          // disabled={isSubmitting}
          fullWidth
        >
          Add
        </AddReportButton>
      </AddReportContainer>
    </Container>
  );
};

export default ReportsList;
