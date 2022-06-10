import React from 'react';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";

import "./SideBar.scss";

const SideBar = ({setTab}) => {
    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">Admin Panel</span>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <li onClick={() => setTab(1)}>
                        <LocalShippingIcon className="icon"/>
                        <span>Замовлення</span>
                    </li>
                    <p>Додатково</p>
                    <li onClick={() => setTab(2)}>
                        <DashboardIcon className="icon"/>
                        <span>Книги, яких залишилось мало</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;