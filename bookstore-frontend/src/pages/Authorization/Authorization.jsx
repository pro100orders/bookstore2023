import React from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

import './Authorization.scss'

const Authorization = ({isLogin}) => {
    return (
        <div className={"auth-page"} style={{minHeight: "100vh"}}>
            {
                isLogin ?
                    <LoginForm/>
                    :
                    <RegistrationForm/>
            }
        </div>
    );
};

export default Authorization;