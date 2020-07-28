import React, { Fragment, useState } from "react";
import { logout } from "../../../redux/actions/auth";
import { connect } from "react-redux";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    props.logout();
    if (props[0]) {
      props[0].history.push("/login");
    }
  };

  const goToProfile = () => {
    if (props[0]) {
      props[0].history.push(localStorage.prefix + "/company-profile");
    }
  };
  return (
    <div className="col-md-6 col-sm-12 right-header">
      <div className="notifications d-flex justify-content-end align-items-center">
        <div className="cart notified">
          <a>
            <img src={`cartImg`} />
          </a>
          <span className="red-dot"></span>
        </div>
        <div className="notification notified">
          <a href="">
            <img src={`bellImg`} />
          </a>
          <span className="red-dot"></span>
        </div>
        <div class="dropdown dropleft">
          <div
            className="blue-circle"
            onClick={(event) => setIsOpen(!isOpen)}
          ></div>
          {isOpen && (
            <div
              class="dropdown-menu show"
              aria-labelledby="dropdownMenuButton"
            >
              <a
                class="dropdown-item"
                onClick={() => {
                  goToProfile();
                }}
              >
                My Company Profile
              </a>
              <a class="dropdown-item" onClick={(e) => handleLogout()}>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.register.isAuth,
  alert: state.alert,
});

export default connect(mapStateToProps, { logout })(Header);
