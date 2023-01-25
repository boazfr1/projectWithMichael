import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import React from 'react';

function Login() {

    const [user, setUser] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    return (
        <div>
            hello world
        </div>
    )
}

export default Login;




function Login() {


    const fetchUsers = async function (e) {
        e.preventDefault()
        let usersString = await fetch('https://jsonplaceholder.typicode.com/users');
        let allUsers = await usersString.json();
        validate(allUsers);
    }

    function validate(users) {
        for (let i = 0; i < users.length; i++) {
            if (user.username === users[i].name && user.password === users[i].address.geo.lat.substr(-4)) {
                localStorage.setItem('currentUser', JSON.stringify(users[i]));
                navigate(`/home/${user.username}`);
                return;
            }
        }
        return alert('user not found');
    }

    function handleChange(e) {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div id="loginDiv">
            <form onSubmit={fetchUsers}>
                <input type="text" placeholder="Username" name="username" value={user.username} onChange={handleChange}></input>
                <input type="password" placeholder="Passward" name='password' value={user.password} onChange={handleChange} ></input>
                <button> LOG IN </button>
            </form>
        </div>
    );
};

// export default Login;