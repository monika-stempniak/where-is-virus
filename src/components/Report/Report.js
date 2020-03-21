import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";

const ButtonContainer = styled(Box)({
  marginTop: 20,
  width: "1000px",
  display: "flex"
});

const MapButton = styled(Button)({
  border: 0,
  borderRadius: 20,
  color: "white",
  height: 40,
  padding: "0 30px",
  width: 200
});

const ConfirmButton = styled(MapButton)({
  background: "#ffcc00",
  marginBottom: 10,
  "&:hover": {
    background: "#ffcc00",
    opacity: 0.8
  }
});

const DeleteButton = styled(MapButton)({
  background: "#ff2d55",
  "&:hover": {
    background: "#ff2d55",
    opacity: 0.8
  }
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

const Report = ({ entry: { location, date, description } }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography>{location}</Typography>
        <Typography>{date}</Typography>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions className={classes.buttons}>
        <ConfirmButton>Confirm</ConfirmButton>
        <DeleteButton
        // onClick={handleOpenReport}
        >
          Delete
        </DeleteButton>
      </CardActions>
    </Card>
  );
};

export default Report;
