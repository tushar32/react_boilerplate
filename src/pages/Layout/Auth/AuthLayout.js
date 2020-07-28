import React, { Fragment } from "react";

const AuthLayout = ({ children }) => (
  <Fragment>
    <div className="wrapper login-page">
      <div className="header">
        <div className="container-fluid">
          <div className="row justify-content-around align-items-center">
            <div className="col-md-4 col-sm-12 logo">
              <img src={require("../../../assets/images/logo.svg")} alt='' />
            </div>
            <div className="col-md-8 col-sm-12 right-header">
              <div className="cta">
                <a href="/login" className="text-right">
                  Sign in.
                </a>
              </div>
              <div className="cta">
                <a href="" className="text-right">
                  Sign up.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-container lblue-bg h-100">
        <div className="big-container h-100">{children}</div>
      </div>
    </div>
  </Fragment>
);

export default AuthLayout;
