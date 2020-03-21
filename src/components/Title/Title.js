import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    root: ({ marginTop, marginBottom }) => ({
      marginTop: marginTop,
      marginBottom: marginBottom
    })
  })
);

const Title = ({
  children,
  align,
  variant = "h5",
  classes,
  marginTop = 0,
  marginBottom = 0
}) => {
  const styles = useStyles({ marginTop, marginBottom });

  const rootClasses = {
    root: styles.root,
    ...classes
  };

  return (
    <Typography variant={variant} align={align} classes={rootClasses}>
      {children}
    </Typography>
  );
};

export default Title;
