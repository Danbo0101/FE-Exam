import { useState } from 'react';
import './Register.scss'
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/authService';
import { toast } from 'react-toastify';
import Language from '../Header/Language';


const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [agree, setAgree] = useState(false);

    const navigate = useNavigate();

    const handleChecked = (event) => {
        setAgree(event.target.checked);
    };

    const handleRegister = async (event) => {

        if (agree) {
            let data = await postRegister(email, password, userName);
            if (data && data.EC === 0) {
                toast.success(data.EM);
                navigate('/login')

            }
            if (data && data.EC !== 0) {
                toast.error(data.EM);
            }
        }
        else {
            toast.warning("Please agree to the terms of use")
        }

    }



    return (
        <div className="sign-up-container">
            <div className="header">
                Already have an account?
                <button onClick={() => { navigate('/login') }}>Login</button>
                <Language />
            </div>
            <div className="title col-4 mx-auto">
                React Exam
            </div>
            <div className="welcome col-4 mx-auto">
                Get better data with conversational forms, surveys, quizzes & more.
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group" >
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={userName}
                        onChange={(event) => { setUserName(event.target.value) }}
                    />
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={agree}
                        onChange={handleChecked}
                        id="agree-checkbox"
                    />
                    <label className="form-check-label" htmlFor="agree-checkbox">
                        I agree to React Exam <u>Terms of Service, Privacy Policy and Data Processing Agreement.</u>
                    </label>
                </div>
                <div className="btn-sign-up">
                    <button
                        onClick={() => handleRegister()}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register;