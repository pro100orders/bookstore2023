import React from 'react';
import {Controller, useForm, useFormState} from "react-hook-form";
import {useDispatch} from "react-redux";
import {Button, TextField} from "@mui/material";
import $api from "../../../http";
import {toastr} from "react-redux-toastr";

const AddAuthorForm = ({setModalCreate}) => {

    const {handleSubmit, control, setFocus, setError} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const dispatch = useDispatch();

    const onSubmit = (author) => {
        $api.post("/authors", author)
            .then(response => {
                dispatch({type: "ADD_AUTHOR", payload: response.data});
                setModalCreate(false);
            })
            .catch(reason => {
                if (reason.response.status === 400) {
                    setError("surname", {type: "custom", message: reason.response.data.error});
                    setFocus("surname");
                    setError("name", {type: "custom", message: reason.response.data.error});
                    setFocus("name");
                } else {
                    toastr.error("Bookstore", "Виникли технічні проблеми");
                }
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="surname"
                rules={{required: "Прізвище автора не може бути пустим"}}
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
                rules={{required: "Ім'я автора не може бути пустим"}}
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
            <Button
                type="submit"
                variant="contained"
                fullWidth={true}
                disableElevation={true}
                sx={{
                    marginTop: 2
                }}
            >
                Додати
            </Button>
        </form>
    );
};

export default AddAuthorForm;