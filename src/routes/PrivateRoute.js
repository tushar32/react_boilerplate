import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AdminLayout from "./../pages/Layout/Admin/AdminLayout";

const PrivateRoute = ({ auth: { access_token }, ...route }) => {
  return (
    <Route
      render={(...props) =>
        !access_token ? (
          <Redirect to="/login" />
        ) : (
          <>
            <AdminLayout {...props}>
              <Route path={route.path} component={route.component} exact />
              {(route.children || []).map((childRoute) => (
                <Route
                  path={childRoute.path}
                  key={childRoute.path}
                  component={childRoute.component}
                  exact
                />
              ))}
            </AdminLayout>
          </>
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.register,
});

export default connect(mapStateToProps)(PrivateRoute);
