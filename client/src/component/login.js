import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {userInfoContext} from "./userInfoContext";


function Login (params) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("Bret");
    const [password, setPassword] = useState("3874");

    const userInfo = useContext(userInfoContext);


    function checkUser(users) {
        for (let user of users) {
            if (user.username === userName) {
                let usPassword = user.address.zipcode.split("-")[1];
                if (password === usPassword) {
                    getId.changeId(user.id)
                    localStorage.setItem("currentUser", user.username);
                    navigate(`/users/${user.name}`);
                    return;
                }
            }
        }
        alert("your username or password is incorrect");
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`http://localhost:3002/users/userName/:${userName}/:${password}`)
            .then((response) => response.json())
            .then((data) => {
                checkUser(data);
            })
    }


    return(
        <div>
            <h1>login</h1>
            <div className="hero">
            <div className="formbox">
                <div className="button-box">
                    <div id="toggle-div"></div>
                    <button id="toggle-login" type="button1" className="toggle-btn">
                        log In
                    </button>
                </div>
                <form onSubmit={(ev) => handleSubmit(ev)} name="login-form" id="login" className="input-group" >
                    <input onChange={(ev) => setUserName(ev.target.value)} name="user-id" type="text" 
                    className="input-field" placeholder="Username" value={userName} required />
                    <input onChange={(ev) => setPassword(ev.target.value)} name="password" type="password" 
                    className="input-field" placeholder="Enter Password" value={password} required />
                    <button id="submit-login-btn" type="submit" className="submit-btn">
                        Log in
                    </button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login;