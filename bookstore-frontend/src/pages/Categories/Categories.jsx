import React, {useEffect, useState} from 'react';
import {Button, Container} from "@mui/material";
import MyModal from "../../components/UI/Modal/MyModal";
import AddCategoryForm from "../../components/Categories/AddCategoryForm/AddCategoryForm";
import EditCategoryForm from "../../components/Categories/EditCategoryForm/EditCategoryForm";
import Category from "../../components/Categories/Category/Category";
import {useDispatch, useSelector} from "react-redux";
import {toastr} from "react-redux-toastr";
import $api from "../../http";

const Categories = () => {

    const [modalCreate, setModalCreate] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const categories = useSelector(state => state.category.categories);
    const [isLoading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        $api.get("/categories")
            .then(response => {
                dispatch({type: "SET_CATEGORIES", payload: response.data});
                setLoading(false);
            })
            .catch(reason => {
                toastr.warning("Bookstore", reason.responce.data);
            });
    }, []);

    return (
        <Container maxWidth="xl" sx={{marginTop: "64px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <Button onClick={() => setModalCreate(true)} sx={{border: "1px solid blue", borderRadius: "2px"}}>
                Додати категорію
            </Button>
            <MyModal open={modalCreate || modalEdit}
                     setOpen={modalCreate ? setModalCreate : setModalEdit} children={
                modalCreate
                    ?
                    <AddCategoryForm setModalCreate={setModalCreate}/>
                    :
                    <EditCategoryForm setModalEdit={setModalEdit}/>
            }/>
            {
                isLoading ?
                    <h1>Loading categories...</h1>
                    :
                    categories.map((category, index) => (
                        <Category key={index} index={index} category={category} setModalEdit={setModalEdit}/>
                    ))
            }
        </Container>
    );
};

export default Categories;