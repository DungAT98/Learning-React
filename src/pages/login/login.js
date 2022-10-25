import InputControl from "../../shared/form-control/input-control";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isErrorUsername, setIsErrorUsername] = useState();
    const [isErrorPassword, setIsErrorPassword] = useState();
    const loginHandler = () => {
        if (isErrorUsername || isErrorPassword) {
            return;
        }

        navigate('/');
    }

    return (
        <form>
            <div className="row mb-2">
                <InputControl labelName="Username" className="col-md-4" initialValue={username}
                              onChange={setUsername} isErrorEvent={setIsErrorUsername} isRequired={true}></InputControl>
            </div>
            <div className="row mb-2">
                <InputControl labelName="Password" className="col-md-4" initialValue={password}
                              onChange={setPassword} isErrorEvent={setIsErrorPassword} isRequired={true}
                              minLength="6"></InputControl>
            </div>
            <div className="row mb-2">
                <div className="col-12">
                    <button type="button" className="btn btn-primary" onClick={loginHandler}>Login</button>
                </div>
            </div>
        </form>

    )
}

export default Login;
