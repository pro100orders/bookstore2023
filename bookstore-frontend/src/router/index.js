import React, {useEffect, useState} from 'react';
import Home from "../pages/Home/Home";
import Authorization from "../pages/Authorization/Authorization";
import Categories from "../pages/Categories/Categories";
import Profile from "../pages/Profile/Profile";
import WishList from "../pages/WishList/WishList";
import {useSelector} from "react-redux";
import Books from "../pages/Books/Books";
import Basket from "../pages/Basket/Basket";
import Authors from "../pages/Authors/Authors";
import BookDetails from "../components/Books/BookDetails/BookDetails";
import Admin from '../pages/Admin/Admin';
import Orders from "../pages/Orders/Orders";

const AppRoutes = () => {

    const roles = useSelector(state => state.auth.user.roles);;

    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        setRoutes([
            {path: "/", component: Books},
            {path: "/books", component: Books},
            {path: "/books/:id", component: BookDetails},
        ]);

        if (roles && roles.includes("ROLE_GUEST")) {
            const guestRoutes = [
                {path: '/login', component: Authorization, flag: true},
                {path: '/registration', component: Authorization, flag: false}
            ];

            setRoutes(routes => routes = routes.concat(guestRoutes));
        }

        if (roles && roles.includes("ROLE_USER")) {
            const userRoutes = [
                {path: "/profile", component: Profile},
                {path: "/wish-list", component: WishList},
                {path: "/basket", component: Basket},
                {path: "/orders", component: Orders},
            ];

            setRoutes(routes => routes = routes.concat(userRoutes));
        }

        if (roles && roles.includes("ROLE_ADMIN")) {
            const adminRoutes = [
                {path: "/admin", component: Admin},
                {path: "/categories", component: Categories},
                {path: "/authors", component: Authors},
            ];

            setRoutes(routes => routes = routes.concat(adminRoutes));
        }
    }, [roles]);

    return routes;
}

export default AppRoutes;