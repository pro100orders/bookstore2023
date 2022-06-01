import React from 'react';
import {Controller, useForm, useFormState} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Button, TextField, Typography} from "@mui/material";
import {emailValidation, passwordValidation} from "./validation";
import {toastr} from "react-redux-toastr";
import $api from "../../http";

import './RegistrationForm.scss';

const RegistrationForm = () => {

    const {handleSubmit, control, setValue, setFocus, setError} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const navigate = useNavigate();

    const onSubmit = (user) => {
        if (user.password !== user.repeat_password) {
            setValue("password", "");
            setValue("repeat_password", "");
            setError("password", {type: "custom", message: "Паролі не збігаються"});
            setError("repeat_password", {type: "custom", message: "Паролі не збігаються"});
            setFocus("password");
        } else {
            const regUser = {email: user.email, password: user.password}
            $api.post('/registration', regUser)
                .then(response => {
                    toastr.success('Bookstore', "Реєстрація успішна");
                    navigate('/login');
                })
                .catch(reason => {
                    if (reason.response.status === 400) {
                        setError('email', {type: 'custom', message: reason.response.data.error});
                    } else {
                        toastr.error("Bookstore", "Виникли технічні проблеми");
                    }
                });
        }
    }

    return (
        <div className='registration-form'>
            <Typography variant="h4" component="div">
                Реєстрація
            </Typography>
            <form className="registration-form__form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="email"
                    rules={emailValidation}
                    render={({field}) => (
                        <TextField
                            label="Пошта"
                            size="small"
                            margin="normal"
                            className="registration-form__input"
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
                            className="registration-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.password?.message}
                            helperText={errors.password?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="repeat_password"
                    rules={{passwordValidation}}
                    render={({field}) => (
                        <TextField
                            label="Повторіть пароль"
                            type="password"
                            size="small"
                            margin="normal"
                            className="registration-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.repeat_password?.message}
                            helperText={errors.repeat_password?.message}
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
                    Зареєструватись
                </Button>
            </form>
        </div>
    );
};

export default RegistrationForm;