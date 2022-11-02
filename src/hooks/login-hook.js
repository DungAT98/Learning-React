import { useEffect, useState } from "react";
import constant from "../commons/constant";
import TokenService from "../services/token.service";

const isHaveToken = () => {
  return !!localStorage.getItem(constant.localStorage.token);
};

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isHaveToken());
  const handleLogin = (data) => {
    TokenService.updateJwtToken(data.token);
    TokenService.updateRefreshToken(data.refreshToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    TokenService.clearToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (isHaveToken()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage]);

  return { isLoggedIn, handleLogin, handleLogout };
};

export default useLogin;
