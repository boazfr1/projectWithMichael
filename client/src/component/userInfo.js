import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { userInfoContext } from "./userInfoContext";


function UserInfo() {
    const navigate = useNavigate();
    const userInfo = useContext(userInfoContext);
    console.log("userInfo.myInfo:", userInfo.myInfo);
    
    function navigateToPage(folderName){
        navigate(folderName);
    }
    return(
        <div>
            <nav>
                <button onClick={() => navigateToPage("/todos")}>todos</button>
                <button onClick={() => navigateToPage("/posts")}>posts</button>
            </nav>
            <div>
                <h1>user info</h1>
                <ul>
                    <li>name - {userInfo.myInfo.name}</li>
                    <li>user name - {userInfo.myInfo.user_name}</li>
                    <li>email - {userInfo.myInfo.email}</li>
                    <li>phone number - {userInfo.myInfo.phone_number}</li>
                </ul>
            </div>
        </div>
    )
}

export default UserInfo;