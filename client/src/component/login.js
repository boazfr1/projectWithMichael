import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { userInfoContext } from "./userInfoContext";



function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("boazf");
    const [password, setPassword] = useState(1234);

    const userInfo = useContext(userInfoContext);

    function checkUser(bool, info) {
        if (bool) {
            userInfo.changeInfo(info[0].id, info[0].name, info[0].user_name, info[0].email, info[0].phone_number, info[0].exist);
            navigate("/userInfo");
            return;
        }
        alert("your username or password is incorrect");
    }
    


function handleSubmit() {
    // event.preventDefault();
    fetch(`http://localhost:3002/login/userName/${userName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, password: password }),
    })
        .then((response) => response.json())
        .then((data) => {
            checkUser(data.bool, data.answer);
        })
}


return (
    <div>
        <h1>login</h1>
        <form name="login-form" id="login" className="input-group" >
            <input onChange={(ev) => setUserName(ev.target.value)} name="user-id" type="text"
                className="input-field" placeholder="Username" value={userName} required />
            <input onChange={(ev) => setPassword(ev.target.value)} name="password" type="password"
                className="input-field" placeholder="Enter Password" value={password} required />
        </form>
        <button onClick={handleSubmit} id="submit-login-btn" type="submit" className="submit-btn">
            Log in
        </button>
    </div>
)
}

export default Login;