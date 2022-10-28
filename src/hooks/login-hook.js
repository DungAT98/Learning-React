import {useEffect, useState} from "react";
import constant from "../commons/constant";

const isHaveToken = () => {
    return !!localStorage.getItem(constant.localStorage.token);
}

const useLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(isHaveToken());
    const handleLogin = (token) => {
        localStorage.setItem(constant.localStorage.token, token);
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        localStorage.removeItem(constant.localStorage.token);
        setIsLoggedIn(false);
    };

    useEffect(() => {
        if (isHaveToken()) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [localStorage]);

    return {isLoggedIn, handleLogin, handleLogout};
}


export default useLogin;
