import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { postLogin } from "../../services/authService";
import "./Login.scss";
import { useState } from "react";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner6 } from "react-icons/im";
import Language from "../Header/Language";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const role = useSelector(state => state.user.account.role);




    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };



    const handleLogin = async () => {
        let isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error("Invalid Email")
            return;
        }
        if (!password) {
            toast.error("Invalid Password")
            return;
        }
        setIsLoading(true);

        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            if (data.DT.role === 'Admin') {
                navigate('/admins');
            } else if (data.DT.role === 'USER' || data.DT.role === 'User') {
                navigate('/users');
            } else {
                alert("me")
            }
            // navigate('/')


        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }

    const handleKeyDown = (event) => {
        // console.log(event.key);
        if (event.key === "Enter") {
            handleLogin();
        }
    }

    return (
        <div className="login-container">
            <div className="header">
                Don't have account yet ?
                <button onClick={() => { navigate('/sign-up') }}> Sign up</button>
                <Language />
            </div>
            <div className="title col-4 mx-auto">
                React Exam
            </div>
            <div className="welcome col-4 mx-auto">
                Hello, Who this ?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </div>
                <span className="forgot">Forgot your password ?</span>
                <div>
                    <button
                        className="btn-submit"
                        onClick={() => handleLogin()}
                        disabled={isLoading}
                    >Login {isLoading === true && <ImSpinner6 className="loader-icon" />}
                    </button>
                </div>
                <div
                    className="back"
                    onClick={() => { navigate('/') }}
                >
                    Go to HomePage
                </div>
            </div>
        </div>
    )
}
export default Login;