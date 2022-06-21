import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {Button, Container, FormControl, InputLabel, MenuItem, Pagination, Select, TextField} from "@mui/material";
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

    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);

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

    async function filter() {
        let filter = books;
        if (selectedAuthors.author && selectedAuthors.author.length !== 0) {
            let list = selectedAuthors.author.map(author => author.surname + " " + author.name);
            filter = filter.filter(book => {
                if (book.authors) {
                    return book.authors.some(author => list.includes(author.surname + " " + author.name));
                } else {
                    return false;
                }
            });
        }
        if (selectedCategories.category && selectedCategories.category.length !== 0) {
            let list = selectedCategories.category.map(category => category.name);
            filter = filter.filter(book => list.includes(book.category.name));
        }
        if (selectedLanguages.language && selectedLanguages.language.length !== 0) {
            let list = selectedLanguages.language;
            filter = filter.filter(book => list.includes(book.language));
        }
        return filter;
    }

    useEffect(() => {
        filter().then(response => setFilterBooks(response));
    }, [books, selectedAuthors, selectedCategories, selectedLanguages])

    useEffect(() => {
        if(isSearch) {
            setIsSearch(false);
        }
        else {
            $api.get("/books/count")
                .then(response => {
                    setAllPage(response.data.count);
                })
                .catch(reason => {
                    toastr.error("Bookstore", "Виникли технічні проблеми");
                });
        }
    }, [books])

    const toSearch = () => {
        $api.get("/books?search=" + search)
            .then(response => {
                setBooks(response.data);
                setAllPage(response.data.length);
                setPage(1);
                setIsSearch(true);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }

    return (
        <Container maxWidth="xl" sx={{marginTop: "10px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
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
                <div>
                    <TextField
                        id="search"
                        label="Пошук"
                        variant="standard"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{width: 300}}
                    />
                    <Button variant="contained" color="primary" onClick={() => toSearch()}>Пошук</Button>
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