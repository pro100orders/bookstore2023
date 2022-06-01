import React, {useEffect, useState} from 'react';
import $api from "../../../http";
import {toastr} from "react-redux-toastr";
import {Autocomplete, Checkbox, List, ListSubheader, TextField} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

const FilterBar = ({
                       selectedAuthors, setSelectedAuthors,
                       selectedCategories, setSelectedCategories,
                       selectedLanguages, setSelectedLanguages
                   }) => {

    const [openAuthor, setOpenAuthor] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [openLanguages, setOpenLanguages] = useState(false);

    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        $api.get("/authors")
            .then(response => {
                setAuthors(response.data);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        $api.get("/categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        $api.get("/books/languages")
            .then(response => {
                setLanguages(response.data);
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }, []);

    return (
        <List
            sx={{width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Фільтрація
                </ListSubheader>
            }
        >
            <Autocomplete
                multiple
                id="selectedAuthors"
                options={authors}
                defaultValue={selectedAuthors}
                onChange={(event, author) =>
                    setSelectedAuthors(prevStare => prevStare = {...prevStare, author})
                }
                getOptionLabel={(option) => {
                    return option.surname + " " + option.name
                }}
                style={{margin: "40px"}}
                renderOption={(props, option, {selected}) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{marginRight: 8}}
                            checked={selected}
                        />
                        {option.surname + " " + option.name}
                    </li>
                )}
                style={{width: "300px"}}
                renderInput={(params) => (
                    <TextField {...params} label="Автори" placeholder="Автори"/>
                )}
            />
            <Autocomplete
                multiple
                id="selectedCategories"
                options={categories}
                defaultValue={selectedCategories}
                onChange={(event, category) =>
                    setSelectedCategories(prevStare => prevStare = {...prevStare, category})
                }
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, {selected}) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{marginRight: 8}}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                )}
                style={{width: "300px"}}
                renderInput={(params) => (
                    <TextField {...params} label="Категорії" placeholder="Категорії"/>
                )}
            />
            <Autocomplete
                multiple
                id="selectedLanguages"
                options={languages}
                defaultValue={selectedLanguages}
                onChange={(event, language) =>
                    setSelectedLanguages(prevStare => prevStare = {...prevStare, language})
                }
                getOptionLabel={(option) => option}
                renderOption={(props, option, {selected}) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{marginRight: 8}}
                            checked={selected}
                        />
                        {option}
                    </li>
                )}
                style={{width: "300px"}}
                renderInput={(params) => (
                    <TextField {...params} label="Мови" placeholder="Мови"/>
                )}
            />
        </List>
    );
};

export default FilterBar;