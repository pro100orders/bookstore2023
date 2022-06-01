import React from 'react';
import {Route, Routes} from 'react-router-dom'
import AppRoutes from "./index";

const AppRouter = () => {
    return (
        <Routes>
            {AppRoutes().map(route =>
                <Route key={route.path}
                       path={route.path}
                       element={<route.component isLogin={route.flag}/>}
                />
            )}
        </Routes>
    );
};

export default AppRouter;