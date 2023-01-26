import React, { createContext, useState } from 'react';




export const userInfoContext = createContext();

export const UserProvider = ({ children }) => {
    const [myInfo, setMyInfo] = useState({
        id: 1,
        name: "boaz",
        user_name: "boazFFF",
        email: "boazfr1@gmail",
        phone_number: "235326sdfv",
        exist: 1
    });
    const changeInfo = (Id, Name, userName, Email, phoneNumber, Exist) => {
        setMyInfo({
            id: Id,
            name: Name,
            user_name: userName,
            email: Email,
            phone_number: phoneNumber,
            exist: Exist
        });
    };

    return <userInfoContext.Provider value={{ myInfo, changeInfo }}>
        {children}
    </userInfoContext.Provider>;

}; 