import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import $api from "../../../http";
import {Button, Checkbox, Container, Typography} from "@mui/material";
import {toastr} from "react-redux-toastr";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useSelector} from "react-redux";
import EditBookForm from "../EditBookForm/EditBookForm";
import AddBookForm from "../AddBookForm/AddBookForm";
import MyModal from "../../UI/Modal/MyModal";

const BookDetails = () => {

    const [book, setBook] = useState({});
    const [isLoading, setLoading] = useState(true);

    const params = useParams();

    const roles = useSelector(state => state.auth.user.roles);

    const [like, setLike] = useState(book.like);

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        $api.get("/books/" + params.id)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
        ;
    }, []);

    const navigateToLogin = () => {
        navigate("/login");
        toastr.info("Bookstore", "Щоб переглядати список бажаного потрібно авторизуватись");
    }

    const likeBook = (id) => {
        $api.post("/user/wish-list", id)
            .then(response => {
                if (like === false) {
                    toastr.success("Bookstore", "Книжка успішно додана до списку бажаного");
                } else {
                    toastr.success("Bookstore", "Книжка успішно видалена зі списку бажаного");
                }
                setLike(!like);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }

    const addToBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                toastr.success("Bookstore", "Книжка успішно додана до кошика");
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }

    const deleteBook = (id) => {
        $api.delete("/books/" + id)
            .then(response => {
                if(response.data === true) {
                    toastr.success("Bookstore", "Книжка успішно видалена");
                    navigate("/books");
                }
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }

    return (
        <Container maxWidth="xl" sx={{marginTop: "64px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            {
                isLoading ?
                    <div>
                        ff
                    </div>
                    :
                    <div>
                        {
                            open &&
                            <MyModal open={open} setOpen={setOpen}
                                     children={<EditBookForm book={book} setOpen={setOpen}/>}/>
                        }
                        <Typography variant="h2" component="div">
                            Книга {book.name}
                        </Typography>
                        <div style={{display: "flex"}}>
                            <div>
                                <img src={"http://localhost:8080/files/" + book.image} alt={book.name}/>
                            </div>
                            <div>
                                <Typography variant="h5" component="div">
                                    Автори :
                                    {
                                        book.authors && book.authors.length !== 0 && book.authors.map(author =>
                                            <Typography variant="h5">
                                                {author.name + ' ' + author.surname}
                                            </Typography>
                                        )
                                    }
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Ціна : {book.price} грн.
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Категорія : {book.category.name}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Видавництво : {book.publishing}
                                </Typography>
                                {
                                    book.bookSeries &&
                                    <Typography variant="h5" component="div">
                                        Серія книг : {book.bookSeries}
                                    </Typography>
                                }
                                <Typography variant="h5" component="div">
                                    Залишилось : {book.amount}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Мова : {book.language}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Рік видавництва : {book.yearPublication}
                                </Typography>
                                {
                                    book.translator &&
                                    <Typography variant="h5" component="div">
                                        Перекладач : {book.translator}
                                    </Typography>
                                }
                                <Typography variant="h5" component="div">
                                    Кількість сторанок : {book.numberPages}
                                </Typography>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <Checkbox icon={<FavoriteBorder/>}
                                              checkedIcon={<Favorite/>}
                                              checked={like}
                                              onChange={e => {
                                                  (roles && roles.includes("ROLE_GUEST")) ?
                                                      navigateToLogin()
                                                      :
                                                      likeBook(book.id)
                                              }}
                                    />
                                    <Button variant="contained" color="success" onClick={() => addToBasket(book.id)}>
                                        Додати в кошик
                                    </Button>
                                </div>
                                {
                                    roles && roles.includes("ROLE_ADMIN") &&
                                    <div style={{display: "flex", justifyContent: "space-between", marginTop: 5}}>
                                        <Button variant="contained" color="warning" onClick={() => setOpen(true)}>
                                            Редагувати
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => deleteBook(book.id)}>
                                            Видалити
                                        </Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </Container>
    );
};

export default BookDetails;