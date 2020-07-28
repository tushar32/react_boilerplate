import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
// call action type (setAlert) from component and use where you want to call that action
import { setAlert } from "../../../redux/actions/alert";
import Alert from "../../../components/Alert/Alert";
import PropTypes from "prop-types";
import { register } from "../../../redux/actions/auth";
import { Redirect } from "react-router-dom";

const Register = ({ setAlert, register, isAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  if (isAuth) {
    return <Redirect to="/file-manager"></Redirect>;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      //call setAlert action to
      setAlert({ password2: { msg: "password doesn't match" } });
    } else {
      register({ name, email, password });
    }
  };

  return (
    <Fragment>
    
        <div className="card-plain">
          <h2 className="large text-primary">Sign Up</h2>
          <p className="lead">
            <i className="fas fa-user"></i> Create Your Account
          </p>

          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="form-control"
                value={name}
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <Alert name="name" />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  onChange(e);
                }}
                name="email"
              />

              <Alert name="email" />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  onChange(e);
                }}
                value={password}
              />
              <Alert name="password" />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="password2"
                onChange={(e) => {
                  onChange(e);
                }}
                value={password2}
              />{" "}
              <Alert name="password2" />
            </div>
            <input
              type="submit"
              className="btn btn-primary btn-block btn-rounded"
              value="Register"
            />
          </form>
          <p className="mt-3">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  alert: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  isAuth: state.register.isAuth,
  alert: state.alert,
});

// Pass the setAlert function to action again
export default connect(mapStateToProps, { setAlert, register })(Register);
