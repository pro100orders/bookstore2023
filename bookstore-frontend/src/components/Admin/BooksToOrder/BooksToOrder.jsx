import React, {useEffect, useState} from 'react';
import $api from "../../../http";
import {toastr} from "react-redux-toastr";

const BooksToOrder = () => {

    const [books, setBooks] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        $api.get("/admin/books")
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.warning("Bookstore", reason.responce.data);
            });
    }, []);

    return (
        <div>
            {
                isLoading ?
                    <div>
                        Загрузка даних...
                    </div>
                    :
                    <div>
                        {
                            books && books.length !== 0 ?
                                <div style={{padding: 10}}>
                                    {
                                        books.map(book => (
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                border: "1px solid blue",
                                                borderRadius: 5,
                                                padding: 10,
                                                margin: 2
                                            }}>
                                                <div style={{width: "5%"}}>
                                                    <div>№ {book.id}</div>
                                                </div>
                                                <div style={{width: "50%"}}>
                                                    <div>Назва: {book.name}</div>
                                                    <div>Категорія: {book.category.name}</div>
                                                    <div>Автори:
                                                        {book.authors.map(author =>
                                                            <p>
                                                                {author.name + ' ' + author.surname}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div>Ціна: {book.price}грн.</div>
                                                </div>
                                                <div style={{width: "20%"}}>
                                                    Залишилось {book.amount}шт.
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                :
                                <div>
                                    Даних нема
                                </div>
                        }
                    </div>
            }
        </div>
    );
};

export default BooksToOrder;