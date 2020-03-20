import React from "react";
import { TextField as MuiTextField } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {}
  })
);

const TextField = props => {
  const classes = useStyles();

  return (
    <MuiTextField {...props} margin="dense" variant="outlined" fullWidth />
  );
};

export default TextField;
