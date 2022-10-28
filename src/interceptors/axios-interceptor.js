import axios from "axios";
import constant from "../commons/constant";

const JwtInterceptor = () => {
    axios.interceptors.request.use((config) => {
        const jwtToken = localStorage.getItem(constant.localStorage.token);
        if (jwtToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${jwtToken}`
            };
        }

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
}

export default JwtInterceptor;
