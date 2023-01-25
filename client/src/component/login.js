import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";


function Login (params) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("Bret");
    const [password, setPassword] = useState("3874");
    
    return(
        <div>
            <h1>login</h1>
        </div>
    )
}

export default Login;