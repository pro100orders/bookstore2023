import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppBar, Container, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {toastr} from "react-redux-toastr";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Logo from '@mui/icons-material/MenuBookOutlined';

import './Header.scss';
import MyModal from "../UI/Modal/MyModal";
import Profile from "../../pages/Profile/Profile";
import EditProfileForm from "../Profile/EditProfileForm";

const Header = () => {

    const roles = useSelector(state => state.auth.user.roles);

    const [activeTab, setActiveTab] = useState(1);

    const dispatch = useDispatch();

    const logout = () => {
        setActiveTab(1);
        if (localStorage.getItem("token"))
            localStorage.removeItem("token");
        dispatch({type: "SET_AUTH", payload: {token: '', user: {roles: ['ROLE_GUEST']}}});
    }

    const [modalProfile, setModalProfile] = useState(false);
    const [modalProfileEdit, setModalProfileEdit] = useState(false);

    useEffect(() => {
        if (modalProfile === true || modalProfileEdit === true) {
            setActiveTab(8);
        } else {
            setActiveTab(1);
        }
    }, [modalProfile, modalProfileEdit])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{ display: "flex" }}>
                        <Typography variant="h5" component="div">
                            <Logo/>
                            <NavLink to={'/'}
                                     className={'header-link'}
                                     onClick={() => setActiveTab(1)}
                            >
                                <b>Bookstore</b>
                            </NavLink>
                        </Typography>
                        <Typography variant="h6" component="div">
                            <NavLink to="/books"
                                     className={'header-link'}
                                     onClick={() => setActiveTab(2)}
                            >
                                Книги
                            </NavLink>
                            {(roles && roles.includes("ROLE_ADMIN")) && (
                                <>
                                    <NavLink to={'/categories'}
                                             className={'header-link'}
                                             onClick={() => setActiveTab(3)}
                                    >
                                        Категорії
                                    </NavLink>
                                    <NavLink to={'/authors'}
                                             className={'header-link'}
                                             onClick={() => setActiveTab(4)}
                                    >
                                        Автори
                                    </NavLink>
                                    {/*<NavLink to={'/admin'}
                                             className={'header-link'}
                                             onClick={() => setActiveTab(5)}
                                    >
                                        Адмін
                                    </NavLink>*/}
                                </>
                            )}
                        </Typography>
                    </div>
                    <Typography variant="h6" component="div" style={{display: "flex"}}>
                        {((roles && roles.length) >= 1 && !roles.includes("ROLE_GUEST")) ?
                            <>
                                <NavLink to={'/wish-list'}
                                         className={'header-link'}
                                         onClick={() => setActiveTab(6)}
                                >
                                    <Tooltip title="Список бажаного">
                                        <IconButton>
                                            {
                                                activeTab === 6 ?
                                                    <FavoriteOutlinedIcon/>
                                                    :
                                                    <FavoriteBorderOutlinedIcon/>
                                            }
                                        </IconButton>
                                    </Tooltip>
                                </NavLink>
                                <NavLink to={'/basket'}
                                         className={'header-link'}
                                         onClick={e => setActiveTab(7)}
                                >
                                    <Tooltip title="Кошик">
                                        <IconButton>
                                            {
                                                activeTab === 7 ?
                                                    <ShoppingBasketIcon/>
                                                    :
                                                    <ShoppingBasketOutlinedIcon/>
                                            }
                                        </IconButton>
                                    </Tooltip>
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink to={'/login'}
                                         onClick={() => toastr.info("Bookstore", "Щоб переглядати список бажаного потрібно авторизуватись")}
                                >
                                    <Tooltip title="Спиоск бажаного">
                                        <IconButton>
                                            <FavoriteBorderOutlinedIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </NavLink>
                                <NavLink to={'/login'}
                                         onClick={() => toastr.info("Bookstore", "Щоб переглядати кошик потрібно авторизуватись")}
                                >
                                    <Tooltip title="Кошик">
                                        <IconButton>
                                            <ShoppingBasketOutlinedIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </NavLink>
                            </>
                        }
                        {((roles && roles.length) >= 1 && !roles.includes("ROLE_GUEST")) ?
                            (
                                <Typography variant="h6" component="div" display={"flex"}>
                                    <NavLink to='/'
                                             className={'header-link'}
                                             onClick={() => setModalProfile(true)}
                                    >
                                        Профіль
                                    </NavLink>
                                    <NavLink to='/' className="header-link" onClick={logout}>
                                        Вийти
                                    </NavLink>
                                    <MyModal open={modalProfile || modalProfileEdit}
                                             setOpen={modalProfile ? setModalProfile : setModalProfileEdit} children={
                                        modalProfile
                                            ?
                                            <Profile setModalProfile={setModalProfile}
                                                     setModalProfileEdit={setModalProfileEdit}/>
                                            :
                                            <EditProfileForm setModalProfile={setModalProfile}
                                                             setModalProfileEdit={setModalProfileEdit}/>
                                    }/>
                                </Typography>
                            )
                            :
                            (
                                <Typography variant="h6" component="div">
                                    <NavLink to={'/login'}
                                             className={'header-link'}
                                             onClick={() => setActiveTab(9)}
                                    >
                                        Авторизація
                                    </NavLink>
                                    <NavLink to={'/registration'}
                                             className={'header-link'}
                                             onClick={() => setActiveTab(10)}
                                    >
                                        Реєстрація
                                    </NavLink>
                                </Typography>
                            )
                        }
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;