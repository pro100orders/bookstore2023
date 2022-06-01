import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {Button, Container, FormControl, InputLabel, MenuItem, Pagination, Select} from "@mui/material";
import MyModal from "../../components/UI/Modal/MyModal";
import AddBookForm from "../../components/Books/AddBookForm/AddBookForm";
import BooksList from "../../components/Books/BooksList/BooksList";
import FilterBar from "../../components/Books/FilterBar/FilterBar";

const Books = () => {

    const roles = useSelector(state => state.auth.user.roles);

    const [books, setBooks] = useState([]);
    const [filterBooks, setFilterBooks] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [allPage, setAllPage] = useState(1);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    useEffect(() => {
        setLoading(true);
        $api.get("/books")
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }, [])

    useEffect(() => {
        setFilterBooks(books);
        if (selectedCategories.length !== 0) {
            console.log(1);
            console.log(books);
            console.log(selectedCategories.category);
            console.log(books.filter(book => selectedCategories.category.includes(book.category)));
            //setFilterBooks(books.filter(book => selectedCategories.category.includes(book.category)));
        }
    }, [books, selectedAuthors, selectedCategories, selectedLanguages])

    useEffect(() => {
        $api.get("/books/count")
            .then(response => {
                setAllPage(response.data.count);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }, [])

    return (
        <Container maxWidth="xl" sx={{marginTop: "64px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    {
                        roles && roles.includes("ROLE_ADMIN") &&
                        <div>
                            <Button onClick={e => setOpen(true)} sx={{border: "1px solid blue", borderRadius: "2px"}}>
                                Додати книжку
                            </Button>
                            <MyModal open={open} setOpen={setOpen}
                                     children={<AddBookForm setBooks={setBooks} setOpen={setOpen}/>}/>
                        </div>
                    }
                </div>
                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel>Кількість</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={size}
                        label="Size"
                        onChange={e => {
                            setSize(e.target.value);
                        }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{display: "flex"}}>
                <div style={{width: 300}}>
                    <FilterBar
                        selectedAuthors={selectedAuthors}
                        setSelectedAuthors={setSelectedAuthors}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        selectedLanguages={selectedLanguages}
                        setSelectedLanguages={setSelectedLanguages}/>
                </div>
                <div>
                    <div>
                        <BooksList books={filterBooks.slice(((page - 1) * size), (page * size))} isLoading={isLoading}/>
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Pagination count={Math.ceil(allPage / size)} page={page}
                                    onChange={(e, value) => setPage(value)}
                                    showFirstButton showLastButton shape="rounded"/>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Books;