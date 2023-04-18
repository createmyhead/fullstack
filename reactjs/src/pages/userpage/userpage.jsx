import React from 'react';
import CreateProduct from '../userpage/CreateProduct/createProduct';
import MyProfile from '../userpage/Profile/profile'
import { useLocation } from 'react-router-dom';
import userDataAfterLogin from '../userpage/StoreUserData/userDataContext'


function UserPage() { 
    const { state } = useLocation(); 
    return (
        <div>
            <userDataAfterLogin.Provider value={state}>
                <MyProfile/>
                <CreateProduct/>
                <div>My Product</div>
            </userDataAfterLogin.Provider>
        </div>
    )
};

export default UserPage;