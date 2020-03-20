import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { SignInForm, LocationMap, NotFound } from "pages";
// import Context from "./store/context";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route exact path="/signin" component={SignInForm} />
        <Route exact path="/map" component={LocationMap} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
