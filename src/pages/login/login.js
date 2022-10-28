import InputControl from "../../shared/form-control/input-control";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../services/login.service";
import { ClipLoader } from "react-spinners";
import useLogin from "../../hooks/login-hook";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorUsername, setIsErrorUsername] = useState();
  const [isErrorPassword, setIsErrorPassword] = useState();
  const [incorrect, setIncorrect] = useState(null);
  const loginButton = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, handleLogin } = useLogin();
  if (isLoggedIn) {
    navigate("/");
  }
  const loginHandler = () => {
    if (isErrorUsername || isErrorPassword) {
      return;
    }

    setIsLoading(true);
    loginButton.current.disabled = true;
    loginService
      .login(username, password)
      .then((res) => {
        setIncorrect(null);
        handleLogin(res.data.token);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setIncorrect("Username and password is incorrect");
        } else {
          setIncorrect(err.response.statusText);
        }
      })
      .finally(() => {
        loginButton.current.disabled = false;
        setIsLoading(false);
      });
  };

  return (
    <form>
      <div className="row mb-2">
        <InputControl
          labelName="Username"
          className="col-md-4"
          initialValue={username}
          onChange={setUsername}
          isErrorEvent={setIsErrorUsername}
          isRequired={true}
        ></InputControl>
      </div>
      <div className="row mb-2">
        <InputControl
          labelName="Password"
          className="col-md-4"
          initialValue={password}
          onChange={setPassword}
          isErrorEvent={setIsErrorPassword}
          isRequired={true}
          minLength="2"
        ></InputControl>
      </div>
      <div className="row mb-2">
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={loginHandler}
            ref={loginButton}
          >
            Login
          </button>
        </div>
      </div>
      {isLoading && <ClipLoader />}
      {incorrect && (
        <div className="row mb-2">
          <span className="text-danger">{incorrect}</span>
        </div>
      )}
    </form>
  );
};

export default Login;
