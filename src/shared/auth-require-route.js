import useLogin from "../hooks/login-hook";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthRequiredRoute = ({ element }) => {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return element;
  }
};

AuthRequiredRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default AuthRequiredRoute;
