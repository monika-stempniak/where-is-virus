import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { SignInForm, LocationMap, ReportsList, NotFound } from "pages";
// import Context from "./store/context";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route
          exact
          path="/signin"
          render={props => <SignInForm {...props} />}
        />
        <Route exact path="/map" render={props => <LocationMap {...props} />} />
        <Route
          exact
          path="/report"
          render={props => <ReportsList {...props} />}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
