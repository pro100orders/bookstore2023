import React, {useState} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import './LoginForm.scss';
import {useDispatch} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {Controller, useForm, useFormState} from "react-hook-form";
import $api from "../../http";
import jwt from "jwt-decode";
import {toastr} from "react-redux-toastr";
import {emailValidation, passwordValidation} from "./validation";

const LoginForm = () => {

    const {handleSubmit, control} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (user) => {
        setError(false);
        $api.post('/login', user)
            .then(response => {
                if (response.data) {
                    localStorage.setItem('token', response.data);
                }
                const token = localStorage.getItem('token') || '';
                const user = jwt(token);
                dispatch({type: "SET_AUTH", payload: {token: token, user: user}});
                toastr.success('Bookstore', "Авторизація успішна");
                navigate('/');
            })
            .catch(reason => {
                if (reason.response.status === 403) {
                    setError(true);
                } else {
                    toastr.error("Bookstore", "Виникли технічні проблеми");
                }
            });
    };

    return (
        <div className='login-form'>
            <Typography variant="h4" component="div">
                Авторизація
            </Typography>
            {
                error &&
                <Typography variant="subtitle1" component="div"
                            gutterBottom={true} className='login-form__subtitle'
                            sx={{color: "red"}}
                >
                    Введені не коректні дані
                </Typography>
            }
            <form className="login-form__form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="email"
                    rules={emailValidation}
                    render={({field}) => (
                        <TextField
                            label="Пошта"
                            size="small"
                            margin="normal"
                            className="login-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.email?.message}
                            helperText={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={passwordValidation}
                    render={({field}) => (
                        <TextField
                            label="Пароль"
                            type="password"
                            size="small"
                            margin="normal"
                            className="login-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.password?.message}
                            helperText={errors.password?.message}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                    disableElevation={true}
                    sx={{
                        marginTop: 2
                    }}
                >
                    Авторизуватись
                </Button>
                <Typography component="div" sx={{marginTop: "5px"}}>
                    Не маєте аккаунта?
                    <NavLink to='/registration' className="link_login-form">Зареєструватись</NavLink>
                </Typography>
            </form>
        </div>
    );
};

export default LoginForm;