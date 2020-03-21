import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import { confirmEvent, deleteEvent } from "api/eventsApi";

const MapButton = styled(Button)({
  border: 0,
  borderRadius: 20,
  color: "white",
  height: 40,
  padding: "0 30px",
  width: 200
});

const ConfirmButton = styled(MapButton)({
  border: "1px solid #ff2d55",
  background: "#ff2d55",
  color: "white",
  marginBottom: 10,
  "&:hover": {
    background: "#ff2d55",
    border: "1px solid #ff2d55",
    color: "white",
    opacity: 0.8
  }
});

const DeleteButton = styled(MapButton)({
  border: "1px solid #3796f4",
  background: "white",
  color: "#333333",
  "&:hover": {
    border: "1px solid #3796f4",
    background: "white",
    color: "#333333",
    opacity: 0.8
  }
});

const Location = styled(Typography)({
  fontWeight: "bold",
  color: "#333333"
});

const DateTime = styled(Typography)({
  color: "#333333"
});

const Description = styled(Typography)({
  color: "#999999",
  fontSize: 12
});

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 10
    },
    buttons: {
      display: "flex",
      flexDirection: "column"
    }
  })
);

const Report = ({
  getAllEvents,
  event: { id, longitude, latitude, address, creationDate, description }
}) => {
  const classes = useStyles();

  const handleConfirmEvent = async () => {
    await confirmEvent({ longitude, latitude });
    getAllEvents();
  };

  const handleDeleteEvent = async () => {
    await deleteEvent(id);
    getAllEvents();
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Location>{address}</Location>
        <DateTime>{creationDate}</DateTime>
        <Description>{description}</Description>
      </CardContent>
      <CardActions className={classes.buttons}>
        <ConfirmButton onClick={handleConfirmEvent}>Confirm</ConfirmButton>
        <DeleteButton onClick={handleDeleteEvent}>Delete</DeleteButton>
      </CardActions>
    </Card>
  );
};

export default Report;
