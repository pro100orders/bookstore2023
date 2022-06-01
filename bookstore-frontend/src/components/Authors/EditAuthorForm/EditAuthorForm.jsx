import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm, useFormState} from "react-hook-form";
import $api from "../../../http";
import {Button, TextField} from "@mui/material";
import {toastr} from "react-redux-toastr";

const EditAuthorForm = ({setModalEdit}) => {

    const editAuthor = useSelector(state => state.author.editAuthor);

    const {handleSubmit, control, setValue, setFocus, setError} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setValue("id", editAuthor.author.id);
        setValue("surname", editAuthor.author.surname);
        setValue("name", editAuthor.author.name);
    }, [editAuthor]);

    const onSubmit = (author) => {
        $api.put("/authors", author)
            .then(response => {
                dispatch({type: "UPDATE_AUTHOR", payload: {index: editAuthor.index, author: response.data}});
                setModalEdit(false);
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
        <div>
            {
                editAuthor.author &&
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
                        Відредагувати
                    </Button>
                </form>
            }
        </div>
    );
};

export default EditAuthorForm;