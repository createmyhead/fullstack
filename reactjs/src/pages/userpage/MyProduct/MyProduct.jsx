import styles from "./MyProduct.module.scss"
import React, { useEffect } from "react";
import {  useContext, useState} from "react";
import classNames from 'classnames/bind'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import imageToBase64 from '../../../app/convertBase64'
import userDataAfterLogin from '../StoreUserData/userDataContext'
import ProductList from "../MyProduct/ProductList/Productlist"
const { Buffer } = require('buffer');

function MyProduct () {
    const [dataProduct, setDataProduct] = useState([]);
    const dataUserFromLogin = useContext(userDataAfterLogin)
    const newdatafromLogin = { ...dataUserFromLogin.uSdata };
    useEffect(() => {
        axios.get(
            `http://localhost:5000/api/userid/${newdatafromLogin.userid}/product/list`
        ).then(response => { setDataProduct(response.data.result) }
        ).catch(error => { console.log(error) })
    }, []);

    return (
            <div>My Product List 
                {dataProduct.map(obj => (
                    <div key={obj.id }>
                        <ProductList
                            id={obj.id}
                            name={obj.product}
                            price={obj.price}
                            quantity={obj.quantity}
                            image={obj.image}
                            description={obj.description}
                            sold={obj.sold}
                            userid={obj.userid}
                            productcode={obj.productcode }
                        />
                    </div>
                ))}   
            </div>

    )

};

export default MyProduct