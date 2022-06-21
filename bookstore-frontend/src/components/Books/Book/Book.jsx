import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {toastr} from "react-redux-toastr";
import $api from "../../../http";
import {Button, Card, CardActions, CardContent, CardMedia, Checkbox, Link, Typography} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useState} from "react";

const Book = ({book, setBooks, isBasket}) => {

    const roles = useSelector(state => state.auth.user.roles);

    const [like, setLike] = useState(book.like);

    const navigate = useNavigate();

    const navigateToLogin = (i) => {
        navigate("/login");
        if(i === 1) {
            toastr.info("Bookstore", "Щоб додати в список бажаного потрібно авторизуватись");
        }
        else {
            toastr.info("Bookstore", "Щоб добавити в кошик потрібно авторизуватись");
        }
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
                console.log(reason)
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }

    const deleteWithBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                setBooks(prevState => prevState.filter(b => b.id !== response.data.id));
                toastr.success("Bookstore", "Книжка успішно видалена з кошика");
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

    return (
        <Card sx={{maxWidth: "200px", margin: 1}}>
            <CardMedia
                component="img"
                image={"http://localhost:8080/files/" + book.image}
                alt="book"
                sx={{width: "200px", height: "370px"}}
            />
            <CardContent sx={{height: 140}}>
                <Typography gutterBottom variant="body1" component="div">
                    <NavLink to={`/books/${book.id}`}>{book.name}</NavLink>
                </Typography>
                <Typography variant="body2" component="div">
                    {book.category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {book.authors.map(author =>
                        <Typography variant="body2" color="text.secondary">
                            {author.name + ' ' + author.surname}
                        </Typography>
                    )}
                </Typography>
                <Typography variant="subtitle1" color="orange">
                    {book.price}грн.
                </Typography>
            </CardContent>
            <CardActions style={{display: "flex", justifyContent: "space-between"}}>
                <Checkbox icon={<FavoriteBorder/>}
                          checkedIcon={<Favorite/>}
                          checked={like}
                          onChange={e => {
                              (roles && roles.includes("ROLE_GUEST")) ?
                                  navigateToLogin(1)
                                  :
                                  likeBook(book.id)
                          }}
                />
                {
                    isBasket ?
                        <Button variant="contained" color="success" onClick={(e) => deleteWithBasket(book.id)}>
                            Видалити
                        </Button>
                        :
                        <div>
                            {
                                book.amount !== 0 &&
                                <Button variant="contained" color="success" onClick={(e) => {
                                    (roles && roles.includes("ROLE_GUEST")) ?
                                        navigateToLogin(2)
                                        :
                                        addToBasket(book.id)
                                }}>
                                    Купити
                                </Button>
                            }
                        </div>
                }
            </CardActions>
        </Card>
    );
};

export default Book;