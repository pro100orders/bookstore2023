import React, {useEffect, useState} from 'react';
import {Button, Container, Typography} from "@mui/material";
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import BooksList from "../../components/Books/BooksList/BooksList";

const Basket = () => {

    const [books, setBooks] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        $api.get("/user/basket")
            .then(value => {
                setBooks(value.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }, [])

    const toOrder = () => {
        $api.post("/user/orders")
            .then(response => {
                if (response.data === true) {
                    setBooks([]);
                    toastr.success("Bookstore", "Замовлення оформлено");
                } else {
                    toastr.error("Bookstore", "Виникли технічні проблеми");
                }
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            })
    }

    return (
        <Container maxWidth="xl" sx={{marginTop: "64px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <Typography variant="h2" component="div">
                Кошик
            </Typography>
            <div>
                <BooksList books={books} isLoading={isLoading} setBooks={setBooks} isBasket={true}/>
            </div>
            {
                books.length !== 0 &&
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button variant="contained" color="success" onClick={() => toOrder()}>Оформити замовлення</Button>
                </div>
            }
        </Container>
    );
};

export default Basket;