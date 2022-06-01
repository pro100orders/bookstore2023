import React from 'react';
import {Controller, useForm, useFormState} from "react-hook-form";
import {useDispatch} from "react-redux";
import {Button, TextField} from "@mui/material";
import $api from "../../../http";
import {toastr} from "react-redux-toastr";

const AddCategoryForm = ({setModalCreate}) => {

    const {handleSubmit, control, setFocus, setError} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const dispatch = useDispatch();

    const onSubmit = (category) => {
        $api.post("/categories", category)
            .then(response => {
                dispatch({type: "ADD_CATEGORY", payload: response.data});
                setModalCreate(false);
            })
            .catch(reason => {
                if (reason.response.status === 400) {
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
                name="name"
                rules={{required: "Категорія не може бути пустою"}}
                render={({field}) => (
                    <TextField
                        label="Категорія"
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

export default AddCategoryForm;