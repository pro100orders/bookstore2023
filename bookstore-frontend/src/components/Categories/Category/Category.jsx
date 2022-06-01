import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {toastr} from "react-redux-toastr";
import {useDispatch} from "react-redux";

import './Category.scss';
import $api from "../../../http";

const Category = ({index, category, setModalEdit}) => {

    const [openDialog, setOpenDialog] = useState(false);

    const dispatch = useDispatch();

    const edit = () => {
        dispatch({type: "SET_EDIT_CATEGORY", payload: {index: index, category: category}});
        setModalEdit(true);
    };

    const remove = () => {
        $api.post("/categories", category.id)
            .then(response => {
                dispatch({type: "DELETE_CATEGORY", payload: category});
                setOpenDialog(false);
            })
            .catch(reason => {
                if (reason.response.status === 400) {
                    toastr.error('Bookstore', reason.response.data);
                } else {
                    toastr.error("Bookstore", "Виникли технічні проблеми");
                }
            });
    };

    return (
        <div key={category.id} className="category">
            <div>
                <h2>{category.name}</h2>
                <h2>Кількість книг : {category.countBooks}</h2>
            </div>
            <div>
                <Button variant="outlined" onClick={edit} style={{marginRight: '5px'}}>Edit</Button>
                <Button variant="outlined" onClick={e => setOpenDialog(true)}>
                    Delete
                </Button>
                <Dialog
                    open={openDialog}
                    onClose={e => setOpenDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Видалення категорії"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {
                                category.countBooks > 0 ?
                                    <p>Цю категорію не можливо видалити так як до неї прив'язані книги</p>
                                    :
                                    <p>Ви впевнені, що хочете видалии категорію '{category.name}'?</p>
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {
                            category.countBooks > 0 ?
                                (
                                    <Button onClick={e => setOpenDialog(false)}>Ok</Button>
                                )
                                :
                                <div>
                                    <Button onClick={e => setOpenDialog(false)}>No</Button>
                                    <Button onClick={e => {
                                        remove();
                                        setOpenDialog(false);
                                    }}
                                    >
                                        Yes
                                    </Button>
                                </div>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Category;