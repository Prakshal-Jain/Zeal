import React, { Component } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

// Import the pages
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import {Routes} from "./routes"

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Switch>
                <Route path={Routes.Homepage.path}><Homepage /></Route>
                <Route path={Routes.SignUp.path}><SignUp /></Route>
                <Route path={Routes.SignIn.path}><SignIn /></Route>
            </Switch>
        )
    }
}

export default Router;