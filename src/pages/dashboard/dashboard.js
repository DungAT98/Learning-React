import { Link, useNavigate } from "react-router-dom";
import React from "react";
import useLogin from "../../hooks/login-hook";
import PropTypes from "prop-types";

const Dashboard = ({ children }) => {
  const { isLoggedIn, handleLogout } = useLogin();
  const navigate = useNavigate();
  const onLogoutClicked = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <h1>{isLoggedIn ? "Welcome" : "Please login"}</h1>
      {!isLoggedIn && (
        <Link className="btn btn-info" to="login">
          Login
        </Link>
      )}
      {isLoggedIn && (
        <button className="btn btn-info" onClick={onLogoutClicked}>
          Logout
        </button>
      )}
      {children}
    </div>
  );
};

Dashboard.propTypes = {
  children: PropTypes.element,
};

export default Dashboard;
