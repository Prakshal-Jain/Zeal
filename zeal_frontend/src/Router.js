import React, { Component } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

// Import the pages
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Routes } from "./routes";
import ForgotPassword from "./pages/ForgotPassword";
import Contact from "./pages/ContactForm"

// Required in index.js to provide routing.
class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path={Routes.Homepage.path}><Homepage /></Route>
                <Route exact path={Routes.SignUp.path}><SignUp /></Route>
                <Route exact path={Routes.SignIn.path}><SignIn /></Route>
                <Route exact path={Routes.ForgotPassword.path}><ForgotPassword /></Route>
                <Route exact path={Routes.Contact.path}><Contact /></Route>
            </Switch>
        )
    }
}

export default Router;