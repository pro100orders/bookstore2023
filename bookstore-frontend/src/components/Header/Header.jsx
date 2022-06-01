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
    const activeClass = "is-active"

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
                    <div>
                        <Typography variant="h5" component="div">
                            <Logo/>
                            <NavLink to={'/'}
                                     className={`header-link ${activeTab === 1 ? activeClass : ''}`}
                                     onClick={e => setActiveTab(1)}
                            >
                                <b>Bookstore</b>
                            </NavLink>
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" component="div">
                            <NavLink to="/books"
                                     className={`header-link ${activeTab === 2 ? activeClass : ''}`}
                                     onClick={e => setActiveTab(2)}
                            >
                                Книги
                            </NavLink>
                            {(roles && roles.includes("ROLE_ADMIN")) && (
                                <>
                                    <NavLink to={'/categories'}
                                             className={`header-link ${activeTab === 3 ? activeClass : ''}`}
                                             onClick={e => setActiveTab(3)}
                                    >
                                        Категорії
                                    </NavLink>
                                    <NavLink to={'/authors'}
                                             className={`header-link ${activeTab === 4 ? activeClass : ''}`}
                                             onClick={e => setActiveTab(4)}
                                    >
                                        Автори
                                    </NavLink>
                                    <NavLink to={'/admin'}
                                             className={`header-link ${activeTab === 5 ? activeClass : ''}`}
                                             onClick={e => setActiveTab(5)}
                                    >
                                        Адмін
                                    </NavLink>
                                </>
                            )}
                        </Typography>
                    </div>
                    <Typography variant="h6" component="div" style={{display: "flex"}}>
                        {((roles && roles.length) >= 1 && !roles.includes("ROLE_GUEST")) ?
                            <>
                                <NavLink to={'/wish-list'}
                                         className={`header-link ${activeTab === 6 ? activeClass : ''}`}
                                         onClick={e => setActiveTab(6)}
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
                                         className={`header-link ${activeTab === 7 ? activeClass : ''}`}
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
                                         onClick={e => toastr.info("Bookstore", "Щоб переглядати список бажаного потрібно авторизуватись")}
                                >
                                    <Tooltip title="Спиоск бажаного">
                                        <IconButton>
                                            <FavoriteBorderOutlinedIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </NavLink>
                                <NavLink to={'/login'}
                                         onClick={e => toastr.info("Bookstore", "Щоб переглядати кошик потрібно авторизуватись")}
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
                                             className={`header-link ${activeTab === 8 ? activeClass : ''}`}
                                             onClick={e => setModalProfile(true)}
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
                                             className={`header-link ${activeTab === 9 ? activeClass : ''}`}
                                             onClick={e => setActiveTab(9)}
                                    >
                                        Авторизація
                                    </NavLink>
                                    <NavLink to={'/registration'}
                                             className={`header-link ${activeTab === 10 ? activeClass : ''}`}
                                             onClick={e => setActiveTab(10)}
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