import React from "react";
import classnames from "classnames";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    root: center => ({
      padding: theme.spacing(3, 0),
      ...(center && {
        display: "Flex",
        justifyContent: "center",
        flexDirection: "column"
      })
    })
  })
);

const MainContainer = ({ children, className, center }) => {
  const classes = useStyles(center);

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
