import React from "react";
import { Typography } from "@material-ui/core";

const Title = ({ children, align, variant = "h5", classes }) => (
  <Typography variant={variant} gutterBottom align={align} classes={classes}>
    {children}
  </Typography>
);

export default Title;
