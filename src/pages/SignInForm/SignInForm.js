import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import { Container, Title, TextField } from "components";

const logo = require("../../assets/logo.png");

const styles = theme => ({
  card: {
    maxWidth: 420,
    marginTop: 50
  },
  form: {
    margin: "0 auto"
  }
});

const LogoContainer = styled.div({
  margin: "30px 0",
  textAlign: "center"
});

const LogoIcon = styled.img({
  width: "100px"
});

const FormButton = styled(Button)({
  background: "#3796f4",
  border: 0,
  borderRadius: 20,
  boxShadow: "0px 12px 30px 0px rgba(55,150,244,0.2)",
  color: "white",
  height: 48,
  padding: "0 30px",
  "&:hover": {
    border: 0,
    background: "#3796f4",
    color: "white",
    opacity: 0.8
  }
});

const Form = props => {
  const handleSubmitForm = async () => {
    const { handleSubmit, history } = props;
    await handleSubmit();
    history.push("map");
  };

  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur
  } = props;

  return (
    <Container center>
      <form onSubmit={handleSubmitForm} className={classes.form}>
        <LogoContainer>
          <LogoIcon src={logo} alt="logo" />
        </LogoContainer>
        <Title variant="h2" align="center" marginTop={20} marginBottom={40}>
          Where is Virus?
        </Title>
        <Card className={classes.card}>
          <CardContent>
            <TextField
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions>
            <FormButton
              type="submit"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              Submit
            </FormButton>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};

const SignInForm = withFormik({
  mapPropsToValues: (
    // props,
    { email = "sanepid.waw@example.com", password = "pk1" }
  ) => {
    return {
      email: email || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must contain at least 3 characters")
      .required("Enter your password")
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // TODO: submit to the server
      setSubmitting(false);
    }, 1000);
  }
})(Form);

export default withStyles(styles)(SignInForm);
