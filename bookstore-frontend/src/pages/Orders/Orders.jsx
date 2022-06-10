import React, {useEffect, useState} from 'react';
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {Button, Container, Typography} from "@mui/material";
import {Link} from "react-router-dom";
const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        $api.get("/user/orders")
            .then(value => {
                setOrders(value.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }, []);

    return (
        <Container maxWidth="xl" sx={{marginTop: "10px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <Typography variant="h2" component="div">
                Замовлення
            </Typography>
            <div>
                {
                    isLoading ?
                        <div>Загрузка даних...</div>
                        :
                        <div>
                            {
                                orders && orders.length === 0 ?
                                    <Typography variant="h5" component="div">
                                        Замовлень немає
                                    </Typography>
                                    :
                                    <div>
                                        {
                                            orders.map(order => (
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    border: "1px solid blue",
                                                    borderRadius: 5,
                                                    padding: 10,
                                                    margin: 2
                                                }}>
                                                    <div style={{width: "10%"}}>
                                                        <div>№ {order.id}</div>
                                                        <div>{order.status}</div>
                                                        <div>{
                                                            order.createdAt[2] + "." + order.createdAt[1] + "." + order.createdAt[0] + " " +
                                                            order.createdAt[3] + ":" + order.createdAt[4] + ":" + order.createdAt[5]
                                                        }</div>
                                                    </div>
                                                    <div style={{width: "50%"}}>
                                                        <div>Книги:</div>
                                                        <div>
                                                            {
                                                                order.books.map(book => (
                                                                    <Link to={"/books/" + book.id}>{book.name} </Link>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div style={{width: "20%"}}>
                                                        Cума замолвення {order.totalPrice}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                }
            </div>
        </Container>
    );
};

export default Orders;