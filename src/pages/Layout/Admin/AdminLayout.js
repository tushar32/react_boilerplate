import React, { Fragment } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Logo from "../../../assets/images/logo.svg";

const AdminLayout = (props) => {
  return (
    <div className="wrapper">
      <div className="header">
        <div className="container-fluid">
          <div className="row justify-content-around align-items-center">
            <div className="col-md-6 col-sm-12 logo-menu">
              <a href="" className="company-logo">
                <img src={Logo} />
              </a>
            </div>
            <Header {...props} />
          </div>
        </div>
      </div>
      <Sidebar {...props} />
      <div className="main-content">{props.children}</div>
    
    </div>
  );
};

export default AdminLayout;
