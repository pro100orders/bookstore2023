import React, {useState} from 'react';
import SideBar from "../../components/SideBar/SideBar";
import Orders from "../../components/Admin/Orders/Orders";
import BooksToOrder from "../../components/Admin/BooksToOrder/BooksToOrder";

const Admin = () => {

    const [tab, setTab] = useState(0);

    return (
        <div style={{display: "flex", minHeight: "100vh"}}>
            <SideBar setTab={setTab}/>
            <div style={{width: "80%"}}>
                {
                    tab === 1 &&
                    <Orders/>
                }
                {
                    tab === 2 &&
                    <BooksToOrder/>
                }
            </div>
        </div>
    );
};

export default Admin;