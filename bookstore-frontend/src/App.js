import AppRouter from "./router/AppRouter";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import jwt from "jwt-decode";
import ReduxToastr from "react-redux-toastr";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {createTheme, ThemeProvider} from "@mui/material";
import {cyan, purple} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple,
    },
});

function App() {

    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token') || '';
            const user = jwt(token);
            dispatch({type: 'SET_AUTH', payload: {token: token, user: user}});
        } else {
            const user = {roles: ['ROLE_GUEST']};
            dispatch({type: 'SET_AUTH', payload: {user: user}});
        }
    }, [token]);

    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <AppRouter/>
            <Footer/>
            <ReduxToastr
                timeOut={7000}
                newestOnTop={false}
                position='top-right'
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick
            />
        </ThemeProvider>
    );
}

export default App;
