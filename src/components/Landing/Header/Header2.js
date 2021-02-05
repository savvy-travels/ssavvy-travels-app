import React, { useState } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../Redux/userReducer";
import "./header2.css";
import axios from "axios";

function Header2(props) {
  // console.log(props);
  const [open, setOpen] = useState(false);

  const userLogout = () => {
    axios.post("/api/auth/logout").then(() => {
      setOpen(false);
      props.logout();
      props.history.push("/");
    });
  };
  return (
    <>
      <header className="header-two">
        <Link className="header-brand" to="/">
          <img
            className="header-logo"
            src="https://colab-image-assets.s3-us-west-1.amazonaws.com/Savvy-Travels-logo.png"
            alt="logo"
          />
          <img
            className="header-name"
            src="https://colab-image-assets.s3-us-west-1.amazonaws.com/Logo-text.png"
            alt='logo-name'
          />
        </Link>
        {props.isLoggedIn ? (
          <div className="user-nav">
            <h1>{props.username}</h1>
            <div
              onClick={() => setOpen(!open)}
              className={open ? "up-triangle" : "down-triangle"}
            ></div>
          </div>
        ) : (
          <span>
            <Link to="/signup">
              <button className=" auth-button-two">signup</button>
            </Link>
            <Link to="/login">
              <button className="auth-button-two">login</button>
            </Link>
          </span>
        )}
      </header>
      <div className={open ? "pop-menu-visible" : "pop-menu"}>
        <div className="nav-items">
          <NavLink
            onClick={() => setOpen(false)}
            className="list-item"
            style={{ textDecoration: "none", color: "#fcfffd" }}
            to="/profile"
          >
            View Profile
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            className="list-item"
            style={{ textDecoration: "none", color: "#fcfffd" }}
            to={"/map"}
          >
            View Map
          </NavLink>
        </div>
        <h3 onClick={() => userLogout()}>Logout</h3>
      </div>
    </>
  );
}
function mapStateToProps(reduxState) {
  return {
    username: reduxState.userReducer.username,
    preferred: reduxState.userReducer.preferred,
    isLoggedIn: reduxState.userReducer.isLoggedIn,
  };
}
export default withRouter(connect(mapStateToProps, { logout })(Header2));
