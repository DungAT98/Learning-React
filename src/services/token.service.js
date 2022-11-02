import constant from "../commons/constant";

const TokenService = {
  getJwtToken: () => localStorage.getItem(constant.localStorage.token),
  getRefreshToken: () =>
    localStorage.getItem(constant.localStorage.refreshToken),
  updateJwtToken: (token) =>
    localStorage.setItem(constant.localStorage.token, token),
  updateRefreshToken: (token) =>
    localStorage.setItem(constant.localStorage.refreshToken, token),
  clearToken: () => {
    localStorage.removeItem(constant.localStorage.token);
    localStorage.removeItem(constant.localStorage.refreshToken);
  },
};

export default TokenService;
