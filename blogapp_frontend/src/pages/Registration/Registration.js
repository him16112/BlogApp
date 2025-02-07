import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../../styles/Registration.css"
import { handleChange, handleSubmit } from "./RegistrationFunction";

const Registration = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [mssg, setMssg] = useState(null);

    const navigate = useNavigate();


    return (
        <>
            <div className="registration-container">
                <div > Registration</div>
                <input type="text" placeholder="username" value={data.username} onChange={(e)=>handleChange(e, data, setData)} name="username" />
                <input type="email" placeholder="email" value={data.email} onChange={(e)=>handleChange(e, data, setData)} name="email" />
                <input type="password" placeholder="password" value={data.password} onChange={(e)=>handleChange(e, data, setData)} name="password" />
                <button onClick={()=>handleSubmit(data, setMssg, navigate)}>Submit</button>
                {mssg && <p className="message">{mssg}</p>}
            </div>
        </>
    )
}

export default Registration;

