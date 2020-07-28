import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "./../../../redux/actions/auth";
import { Link, NavLink } from "react-router-dom";
import { routes } from "./../../../routes/Routes";

const Sidebar = (props) => {
  const url = props[0].location.pathname;
  return (
    <div className="left-panel h-100">
      <ul className="list-unstyled">
        {/* {routes[1][localStorage.portal].map((route) => {

          let icon = url.includes(route.path) ?  route.activeIcon :  route.icon ;

          return (
            <li key={`nav` + route.path}>
              <NavLink to={`${route.path}`} activeClassName="current">

                <img src={require("../../../assets/images/" + icon)} alt=""/>
              </NavLink>
            </li>
          );
        })} */}
        <li> Dashboard</li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.register,
});

export default connect(mapStateToProps, { logout })(Sidebar);
