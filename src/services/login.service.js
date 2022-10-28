import axios from "axios";
import Constants from "../commons/constant";

const LoginService = {
    login: (username, password) => {
        return axios.get(`${Constants.apiUri}/Account/login?username=${username}&password=${password}`);
    }
};

export default LoginService;
