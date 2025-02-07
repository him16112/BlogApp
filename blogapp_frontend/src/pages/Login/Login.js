import React, { useEffect, useState } from "react";
import '../../styles/Login.css';
import { useNavigate } from "react-router";
import { checkTokenValidity, handleChange, handleClick } from "./LoginFunctions"
 
const Login = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        checkTokenValidity(navigate)
        .finally(() => setLoading(false));
    },[navigate])

    if(loading){
        return <div>loading</div>
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={(e) => handleClick(e, data, setMessage, navigate)}>
                <input
                    type="text"
                    placeholder="Username"
                    value={data.username}
                    onChange={(e) => handleChange(e, data, setData)}
                    name="username"
                    className="input-field"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) => handleChange(e, data, setData)}
                    name="password"
                    className="input-field"
                    required
                />
                <button type="submit" className="submit-btn">Submit</button>
                <button type="submit" className="submit-btn" onClick={()=> navigate('/registration')}>Registration</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Login;
