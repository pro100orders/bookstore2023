import React, {useEffect, useState} from 'react';
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {Button, Typography} from "@mui/material";

const Profile = ({setModalProfile, setModalProfileEdit}) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        $api.get('/user/profile')
            .then(response => {
                setUser(response.data);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }, []);

    return (
        <div>
            <Typography variant="h3" component="div">
                Мій профіль
            </Typography>
            {
                user.surname &&
                <Typography variant="h5" component="div">
                    Прізвище : {user.surname}
                </Typography>
            }
            {
                user.name &&
                <Typography variant="h5" component="div">
                    Ім'я : {user.name}
                </Typography>
            }
            <Typography variant="h5" component="div">
                Пошта : {user.email}
            </Typography>
            {
                user.phone &&
                <Typography variant="h5" component="div">
                    Номер телефону : {user.phone}
                </Typography>
            }
            {
                user.address &&
                <Typography variant="h5" component="div">
                    Адресса : {user.address}
                </Typography>
            }
            <div style={{marginTop: 2}}>
                <Button variant="contained" color="primary" onClick={e => {
                    setModalProfile(false);
                    setModalProfileEdit(true);
                }}>
                    Редагувати профіль
                </Button>
            </div>
            <div style={{marginTop: 2}}>
                <Button variant="contained" color="primary" onClick={e => {
                    setModalProfile(false);
                    setModalProfileEdit(true);
                }}>
                    Мої замовлення
                </Button>
            </div>
        </div>
    );
};

export default Profile;