import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// Import the pages
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import { Routes } from "./routes";
import ForgotPassword from "./pages/ForgotPassword";
import Contact from "./pages/ContactForm";
import Event from "./pages/Events";
import { RouteWithSidebar } from "./components/RouteComponents";
import EventDetails from "./pages/EventDetails";
import ResetPassword from "./pages/ResetPassword";

// Required in index.js to provide routing.
class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={Routes.Homepage.path}>
          <Homepage />
        </Route>
        <Route exact path={Routes.SignUp.path}>
          <SignUp />
        </Route>
        <Route exact path={Routes.SignIn.path}>
          <SignIn />
        </Route>
        <Route exact path={Routes.ForgotPassword.path}>
          <ForgotPassword />
        </Route>
        <Route exact path={Routes.Contact.path}>
          <Contact />
        </Route>
        <Route exact path={Routes.ResetPassword.path}>
          <ResetPassword {...this.props} />
        </Route>
        <RouteWithSidebar
          exact
          path={Routes.Profile.path}
          component={Profile}
        />
        <RouteWithSidebar exact path={Routes.Events.path} component={Event} />
        <RouteWithSidebar
          exact
          path={{pathname: Routes.EventDetails.path, search: window.location.search}}
          component={EventDetails}
        />
      </Switch>
    );
  }
}

export default Router;
