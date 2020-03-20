import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";
import { withStyles, styled } from "@material-ui/core/styles";
import { Container, Title, TextField } from "components";

const styles = theme => ({
  card: {
    maxWidth: 420,
    marginTop: 50
  },
  container: {
    display: "Flex",
    justifyContent: "center"
  },
  title: {
    marginTop: 50
  }
});

const MyButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px"
});

const form = props => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  return (
    <Container className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Title align="center" classes={{ root: classes.title }}>
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
            <MyButton
              type="submit"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              SUBMIT
            </MyButton>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};

const SignInForm = withFormik({
  mapPropsToValues: ({ email, password }) => {
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
      .min(8, "Password must contain at least 8 characters")
      .required("Enter your password")
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(form);

export default withStyles(styles)(SignInForm);
