import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AuthLayout from "./../pages/Layout/Auth/AuthLayout";

const AuthRoute = ({
  component: Component,
  auth: { access_token },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      access_token ? (
        <Redirect from='/' to={`${localStorage.prefix}/dashboard`} />
      ) : (
        <AuthLayout>
          <Component {...props} />
        </AuthLayout>
      )
    }
  />
);

AuthRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.register,
});

export default connect(mapStateToProps)(AuthRoute);
