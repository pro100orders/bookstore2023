import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import $api from "../../../http";
import {toastr} from "react-redux-toastr";
import {Link} from "react-router-dom";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        $api.get("/admin/orders")
            .then(response => {
                setOrders(response.data);
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
                            orders && orders.length !== 0 ?
                                <div style={{padding: 10}}>
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
                                                <div style={{width: "20%"}}>
                                                    <div>Користувач</div>
                                                    <div>{order.user.surname + " " + order.user.name}</div>
                                                    <div>Пошта: {order.user.email}</div>
                                                    <div>Номер телеону: {order.user.phone}</div>
                                                </div>
                                                <div style={{width: "30%"}}>
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

export default Orders;