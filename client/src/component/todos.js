import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { userInfoContext } from "./userInfoContext";


function Todos() {
    const userInfo = useContext(userInfoContext);
    console.log("userInfo.myInfo:", userInfo.myInfo);
    return(
        <div>
         
                <h1>todos</h1>
 
        </div>
    )
}

export default Todos;