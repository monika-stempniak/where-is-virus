import React from "react";
import classnames from "classnames";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(3, 0)
    }
  })
);

const MainContainer = ({ children, className }) => {
  const classes = useStyles();

  return (
    <Container
      fixed
      className={classnames(classes.root, className)}
      maxWidth="md"
    >
      {children}
    </Container>
  );
};

export default MainContainer;
