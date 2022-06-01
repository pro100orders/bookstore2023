import React, {useEffect, useState} from 'react';
import {Button, Container} from "@mui/material";
import MyModal from "../../components/UI/Modal/MyModal";
import AddCategoryForm from "../../components/Categories/AddCategoryForm/AddCategoryForm";
import EditCategoryForm from "../../components/Categories/EditCategoryForm/EditCategoryForm";
import Category from "../../components/Categories/Category/Category";
import {useDispatch, useSelector} from "react-redux";
import {toastr} from "react-redux-toastr";
import $api from "../../http";
import AddAuthorForm from "../../components/Authors/AddAuthorForm/AddAuthorForm";
import EditAuthorForm from "../../components/Authors/EditAuthorForm/EditAuthorForm";
import Author from "../../components/Authors/Author/Author";

const Authors = () => {

    const [modalCreate, setModalCreate] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const authors = useSelector(state => state.author.authors);
    const [isLoading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        $api.get("/authors")
            .then(response => {
                dispatch({type: "SET_AUTHORS", payload: response.data});
                setLoading(false);
            })
            .catch(reason => {
                toastr.warning("Bookstore", reason.responce.data);
            });
    }, []);

    return (
        <Container maxWidth="xl" sx={{marginTop: "64px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <Button onClick={() => setModalCreate(true)} sx={{border: "1px solid blue", borderRadius: "2px"}}>
                Додати автора
            </Button>
            <MyModal open={modalCreate || modalEdit}
                     setOpen={modalCreate ? setModalCreate : setModalEdit} children={
                modalCreate
                    ?
                    <AddAuthorForm setModalCreate={setModalCreate}/>
                    :
                    <EditAuthorForm setModalEdit={setModalEdit}/>
            }/>
            {
                isLoading ?
                    <h1>Загрузка авторів...</h1>
                    :
                    authors.map((author, index) => (
                        <Author key={index} index={index} author={author} setModalEdit={setModalEdit}/>
                    ))
            }
        </Container>
    );
};

export default Authors;