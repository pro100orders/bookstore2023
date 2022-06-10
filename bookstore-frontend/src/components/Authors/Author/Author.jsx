import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {toastr} from "react-redux-toastr";
import {useDispatch} from "react-redux";

import './Author.scss';
import $api from "../../../http";

const Author = ({index, author, setModalEdit}) => {

    const [openDialog, setOpenDialog] = useState(false);

    const dispatch = useDispatch();

    const edit = () => {
        dispatch({type: "SET_EDIT_AUTHOR", payload: {index: index, author: author}});
        setModalEdit(true);
    };

    const remove = () => {
        $api.post("/authors", author.id)
            .then(response => {
                dispatch({type: "DELETE_AUTHOR", payload: author});
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
        <div key={author.id} className="category">
            <div>
                <h2>{author.surname + " " + author.name}</h2>
                {/*<h2>Кількість книг : {category.countBooks}</h2>*/}
            </div>
            <div>
                <Button variant="outlined" onClick={edit} style={{marginRight: '5px'}}>Редагувати</Button>
                {/*<Button variant="outlined" onClick={e => setOpenDialog(true)}>
                    Delete
                </Button>*/}
                <Dialog
                    open={openDialog}
                    onClose={e => setOpenDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Видалення автора"}
                    </DialogTitle>
                    <DialogContent>
                        {/*<DialogContentText id="alert-dialog-description">
                            {
                                category.countBooks > 0 ?
                                    <p>Цю категорію не можливо видалити так як до неї прив'язані книги</p>
                                    :
                                    <p>Ви впевнені, що хочете видалии категорію '{category.name}'?</p>
                            }
                        </DialogContentText>*/}
                    </DialogContent>
                    <DialogActions>
                        {/*{
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
                        }*/}
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Author;