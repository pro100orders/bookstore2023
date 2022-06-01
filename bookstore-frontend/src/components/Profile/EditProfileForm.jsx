import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {Controller, useForm, useFormState} from "react-hook-form";
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {emailValidation, passwordValidation} from "./validation";

const EditProfileForm = ({setModalProfile, setModalProfileEdit}) => {

    const {handleSubmit, control, setValue, setFocus, setError} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const [oldUser, setOldUser] = useState({});

    useEffect(() => {
        $api.get('/user/profile')
            .then(response => {
                setOldUser(response.data);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }, []);

    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setValue("id", oldUser.id);
        setValue("surname", oldUser.surname);
        setValue("name", oldUser.name);
        setValue("email", oldUser.email);
        setValue("phone", oldUser.phone);
        setValue("address", oldUser.address);
    }, [oldUser]);

    const onSubmit = (user) => {
        if ((user.password && user.password.length > 1) ||
            (user.newPassword && user.newPassword.length > 1) ||
            (user.repeat_new_password && user.repeat_new_password.length > 1)) {
            if (!user.user.password || user.user.password.length === 0) {
                setError("user.password", {type: "custom", message: "Old Password cannot be empty"});
                setFlag(true);
            }
            if (!user.newPassword || user.newPassword.length === 0) {
                console.log("2");
                setError("newPassword", {type: "custom", message: "New Password cannot be empty"});
                setFlag(true);
            }
            if (!user.repeat_new_password || user.repeat_new_password.length === 0) {
                console.log("3");
                setError("repeat_new_password", {type: "custom", message: "Repeat New Password cannot be empty"});
                setFlag(true);
            }

            if (user.newPassword !== user.repeat_new_password) {
                setValue("newPassword", "");
                setValue("repeat_new_password", "");
                setError("newPassword", {type: "custom", message: "Passwords do not match"});
                setError("repeat_new_password", {type: "custom", message: "Passwords do not match"});
                setFocus("newPassword");
                setFlag(true);
            }
        }
        if (!flag) {
            if (user.password === undefined || user.newPassword === undefined) {
                let userWithoutPassword = {...user, password: "", newPassword: ""};
                console.log("update", userWithoutPassword);
                $api.put('/user/profile', userWithoutPassword)
                    .then(response => {
                        setOldUser(response.data);
                        setModalProfileEdit(false);
                        setModalProfile(true);
                    });
            } else {
                console.log("update", user);
                $api.put('/user/profile', user)
                    .then(response => {
                        setOldUser(response.data);
                        setModalProfileEdit(false);
                        setModalProfile(true);
                    });
            }
        }
    }

    return (
        <div className='edit-profile-form'>
            <form className="login-form__form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="surname"
                    render={({field}) => (
                        <TextField
                            label="Прізвище"
                            size="small"
                            margin="normal"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.surname?.message}
                            helperText={errors.surname?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="name"
                    render={({field}) => (
                        <TextField
                            label="Ім'я"
                            size="small"
                            margin="normal"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.name?.message}
                            helperText={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    rules={emailValidation}
                    render={({field}) => (
                        <TextField
                            label="Пошта"
                            size="small"
                            margin="normal"
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
                    name="phone"
                    rules={{
                        validate: (value) => {
                            if (value.length < 10 || value.length > 20) {
                                return "Phone must be between 10 and 20 characters long";
                            }

                            return true;
                        }
                    }}
                    render={({field}) => (
                        <TextField
                            label="Номер телефону"
                            size="small"
                            margin="normal"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.phone?.message}
                            helperText={errors.phone?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="address"
                    render={({field}) => (
                        <TextField
                            label="Адреса"
                            size="small"
                            margin="normal"
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
                            label="Старий пароль"
                            type="password"
                            size="small"
                            margin="normal"
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
                    name="newPassword"
                    rules={passwordValidation}
                    render={({field}) => (
                        <TextField
                            label="Новий пароль"
                            type="password"
                            size="small"
                            margin="normal"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.new_password?.message}
                            helperText={errors.new_password?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="repeat_new_password"
                    rules={passwordValidation}
                    render={({field}) => (
                        <TextField
                            label="Новий пароль"
                            type="password"
                            size="small"
                            margin="normal"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.repeat_new_password?.message}
                            helperText={errors.repeat_new_password?.message}
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
                    Відредагувати
                </Button>
            </form>
        </div>
    );
};

export default EditProfileForm;