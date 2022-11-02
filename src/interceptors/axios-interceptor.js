import axios from "axios";
import constant from "../commons/constant";
import loginService from "../services/login.service";
import TokenService from "../services/token.service";
import tokenService from "../services/token.service";

const JwtInterceptor = () => {
  const jwtToken = localStorage.getItem(constant.localStorage.token);
  loginService;
  axios.interceptors.request.use(
    (config) => {
      config.headers = {
        ...config.headers,
        "Content-type": "application/json; charset=utf-8",
      };
      if (jwtToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${jwtToken}`,
        };
      }

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/account/login" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await loginService
              .refreshToken(
                tokenService.getJwtToken(),
                tokenService.getRefreshToken()
              )
              .catch(() => {
                tokenService.clearToken();
                location.href = "/login";
              });

            const { token, refreshToken } = rs.data;
            TokenService.updateJwtToken(token);
            TokenService.updateRefreshToken(refreshToken);

            return axios(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default JwtInterceptor;
