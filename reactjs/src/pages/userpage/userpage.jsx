import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useLocation} from "react-router-dom";
import classNames from 'classnames/bind'
import styles from './userpage.module.scss'
import axios from 'axios';


const cx = classNames.bind(styles)

function UserPage() { 
    const location = useLocation();
    const param = location.pathname;
    const userparam = param.split('/');
    const configaxios = {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
                        }};
    const dataInit = {
        proname: "",
        price: "",
        quantity: "",
        sold: "",
        description: "",
        imagep:""
        
    };
    const [dataProduct, setDataProduct] = useState(dataInit);
    const handleSubmit = async event => {
        event.preventDefault();
        try {
               
            const pronameinput = dataProduct.proname;
            const priceinput = dataProduct.price;
            const quantityinput = dataProduct.quantity;
            const soldinput = dataProduct.sold;
            const descriptioninput = dataProduct.description;
            const imageinput = dataProduct.imagep
            console.log(dataProduct)
            await axios.post(`http://localhost:5000/api/user/${userparam[2]}/product/create`,
                {
                    productName: pronameinput,
                    price: priceinput,
                    quantity: quantityinput,
                    sold: soldinput,
                    description: descriptioninput,
                    image: imageinput
                }, configaxios).then(function (response) {
                    console.log(response)
                });
        } catch (error) {console.log(error);}
    }
    return (
        <div className={cx('userpage')}>
            <div className={ cx('profile')}>Profile
                <div className={cx('userinfor')} >
                </div>
                <div className={cx('edittprofile')}>
                    Edit Profile :
                </div>
            </div>
            <div className={cx('productbox') }> Product
                <div className={cx('createproduct')}>
                    <form  onSubmit={handleSubmit}>              
                        <div className={cx('proname')}>
                            <label>Product Name :</label>
                            <input
                                value={dataProduct.proname}
                                onChange={e => { setDataProduct({ ...dataProduct, proname: e.target.value })}}
                                type="text"
                                required
                                name="productname"
                            ></input>
                        </div>
                        <div className={cx("productprice") }>
                            <label>Price :</label>
                            <input
                            value={dataProduct.price}
                            onChange={e => { setDataProduct({ ...dataProduct, price: e.target.value })}}
                            type="text"
                            required
                            name="price"
                            ></input>
                        </div>
                        <div className={cx("productquan") }>
                            <label>Quantity :</label>
                            <input
                            value={dataProduct.quantity}
                            onChange={e => { setDataProduct({ ...dataProduct, quantity: e.target.value })}}
                            type="text"
                            required
                            name="quanti"
                            ></input>
                        </div>
                        <div className={cx("productsold") }>
                            <label>Sold :</label>
                            <input
                            value={dataProduct.sold}
                            onChange={e => { setDataProduct({ ...dataProduct, sold: e.target.value })}}
                            type="text"
                            required
                            name="sold"
                            ></input>
                        </div>
                        <div className={cx("productdescription") }>
                            <label>Description :</label>
                            <input
                            value={dataProduct.description}
                            onChange={e => { setDataProduct({ ...dataProduct, description: e.target.value })}}
                                type="text"
                                required
                                name="description"
                            ></input>
                        </div>
                        <div className={cx("productview") }>
                            <label>Image :</label>
                            <input 
                                onChange={e => { setDataProduct({ ...dataProduct, imagep: [e.target.files] })}}
                                accept=".jpg, .jpeg, .png"
                                multiple
                                type="file"
                                name="imagep">
                            </input>
                        </div>
                        <div className={cx('btncreatep') }>
                            <button
                                type="submit">
                                Create New Product
                            </button> 
                        </div>   
                    </form>        
                </div>
                <div className={cx('myproduct')}>
                    My product
                </div>
                <div className={cx('soldproduct')}>
                    Sold Product
                </div>
                <div className={cx('bougthproduct')}>
                    Bougth Product
                </div>
            </div> 
        </div>
    )

};

export default UserPage;