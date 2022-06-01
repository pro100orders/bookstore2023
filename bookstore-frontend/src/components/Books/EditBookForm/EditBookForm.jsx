import $api from "../../../http";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Controller, useForm, useFormState} from "react-hook-form";
import {toastr} from "react-redux-toastr";
import {Autocomplete, Button, MenuItem, Select, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

const EditBookForm = ({book, setOpen}) => {

    const {handleSubmit, control, setValue} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [authors, setAuthors] = useState([]);

    const categories = useSelector(state => state.category.categories);
    const [isLoading, setLoading] = useState(true);

    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        $api.get("/authors")
            .then(response => {
                setAuthors(response.data);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        $api.get("/categories")
            .then(response => {
                dispatch({type: "SET_CATEGORIES", payload: response.data});
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        $api.get("/books/languages")
            .then(response => {
                setLanguages(response.data);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        setValue("id", book.id);
        setValue("name", book.name);
        setValue("authors", book.authors);
        setSelectedAuthors(book.authors);
        setValue("price", book.price);
        setValue("categoryId", book.category.id);
        setValue("publishing", book.publishing);
        setValue("bookSeries", book.bookSeries);
        setValue("amount", book.amount);
        setValue("language", book.language);
        setValue("yearPublication", book.yearPublication);
        setValue("translator", book.translator);
        setValue("numberPages", book.numberPages);
    }, []);

    const onSubmit = (book) => {
        book.authors = selectedAuthors.authors;
        console.log(book);
        $api.put("/books", book)
            .then(response => {
                if (file != null) {
                    const fd = new FormData();
                    fd.append("image", file, file.name);
                    $api.post("/books/photo/" + response.data.id, fd)
                        .then(response1 => {
                            setOpen(false);
                            navigate("/books");
                        })
                        .catch(reason => {
                            console.log(reason.response.data.error);
                        })
                }
                else {
                    setOpen(false);
                    navigate("/books");
                }
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    };

    const [selectedAuthors, setSelectedAuthors] = useState([]);

    const [file, setFile] = useState(null);

    const fileSelectorHandler = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className='add-book-form' style={{width: "600px"}}>
            <form className="add-book-form__form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="name"
                    //rules={{required: "Заповніть це поле"}}
                    render={({field}) => (
                        <TextField
                            label="Назва"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
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
                    name="authors"
                    //rules={{required: "Заповніть це поле"}}
                    render={({field}) => (
                        <Autocomplete
                            multiple
                            label="Автори"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(event, authors) =>
                                setSelectedAuthors(prevStare => prevStare = {...prevStare, authors})
                            }
                            error={!!errors.authors?.message}
                            helperText={errors.authors?.message}
                            options={authors}
                            getOptionLabel={(option) => {
                                return option.surname + " " + option.name
                            }}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Автори"
                                    placeholder="Автори"
                                />
                            )}
                        />
                    )}
                />
                <div>
                    <p>Фото:</p>
                    <input type={"file"} onChange={fileSelectorHandler}/>
                </div>
                <Controller
                    control={control}
                    name="price"
                    //rules={{required: "Заповніть це поле"}}
                    render={({field}) => (
                        <TextField
                            label="Ціна"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.price?.message}
                            helperText={errors.price?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="categoryId"
                    //rules={{required: "Заповніть це поле"}}
                    render={({field}) => (
                        <Select
                            label="Категорія"
                            size="small"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.categoryId?.message}
                        >
                            {
                                !isLoading &&
                                categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    )}
                />
                <Controller
                    control={control}
                    name="publishing"
                    //rules={{required: "Заповніть це поле"}}
                    render={({field}) => (
                        <TextField
                            label="Видавництво"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.publishing?.message}
                            helperText={errors.publishing?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="bookSeries"
                    render={({field}) => (
                        <TextField
                            label="Серія книг"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.bookSeries?.message}
                            helperText={errors.bookSeries?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="amount"
                    //rules={{required: "Заповніть це поле"}}
                    render={({field}) => (
                        <TextField
                            label="Кількість"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.amount?.message}
                            helperText={errors.amount?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="language"
                    //rules={{required: "Заповніть це поле"}}
                    render={({field}) => (
                        <Select
                            label="Мова"
                            size="small"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.language?.message}
                        >
                            {
                                !isLoading &&
                                languages.map((language) => (
                                        <MenuItem key={language} value={language}>{language}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    )}
                />
                <Controller
                    control={control}
                    name="yearPublication"
                    //rules={{required: "Заповніть це поле"}}
                    render={({field}) => (
                        <TextField
                            label="Рік видавництва"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.yearPublication?.message}
                            helperText={errors.yearPublication?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="translator"
                    render={({field}) => (
                        <TextField
                            label="Перекладач"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.translator?.message}
                            helperText={errors.translator?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="numberPages"
                    //rules={{required: "Заповніть це поле"}}
                    render={({field}) => (
                        <TextField
                            label="Кількість сторінок"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.numberPages?.message}
                            helperText={errors.numberPages?.message}
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
    )
        ;
};

export default EditBookForm;