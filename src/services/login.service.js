import axios from "axios";
import Constants from "../commons/constant";

const LoginService = {
  login: (username, password) => {
    return axios.get(
      `${Constants.apiUri}/Account/login?username=${username}&password=${password}`
    );
  },
  refreshToken: (jwtToken, refreshToken) => {
    const params = new URLSearchParams();
    params.append("token", jwtToken);
    params.append("refreshToken", refreshToken);

    return axios.get(
      `${Constants.apiUri}/Account/RefreshToken?${params.toString()}`
    );
  },
};

export default LoginService;
