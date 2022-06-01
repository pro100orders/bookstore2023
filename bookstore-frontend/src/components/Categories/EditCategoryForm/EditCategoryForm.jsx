import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm, useFormState} from "react-hook-form";
import $api from "../../../http";
import {Button, TextField} from "@mui/material";
import {toastr} from "react-redux-toastr";

const EditCategoryForm = ({setModalEdit}) => {

    const editCategory = useSelector(state => state.category.editCategory);

    const {handleSubmit, control, setValue, setFocus, setError} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setValue("id", editCategory.category.id);
        setValue("name", editCategory.category.name);
        setValue("countBooks", editCategory.category.countBooks);
    }, [editCategory]);

    const onSubmit = (category) => {
        $api.put("/categories", category)
            .then(response => {
                dispatch({type: "UPDATE_CATEGORY", payload: {index: editCategory.index, category: response.data}});
                setModalEdit(false);
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
        <div>
            {
                editCategory.category &&
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
                        Відредагувати
                    </Button>
                </form>
            }
        </div>
    );
};

export default EditCategoryForm;