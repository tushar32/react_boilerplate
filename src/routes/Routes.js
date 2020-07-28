import React, { Fragment, lazy } from "react";
import { Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import RouteNotFound from "../components/404/RouteNotFound";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <AuthRoute exact path="/" component={Login} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
        <PrivateRoute component={RouteNotFound} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
