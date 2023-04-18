import React from "react";
import styles from './productcard.module.scss';
import classNames from 'classnames/bind'
const { Buffer } = require('buffer');
const cx = classNames.bind(styles)

const ProductCard = (props) => {
    const { id, userid, name, price, description, productcode, sold, quantity, image } = props;
    const base64String = new Buffer(image, 'base64').toString('binary');
    const myarry = JSON.parse(base64String);
  
    return (
        <>
            <section className={cx("products") }>
                <div className={cx('prodcutinfor') }>
                    <p>Product's Name : {name}</p>
                    <p>Price : {price }</p>
                    <p>Seller : {userid}</p>
                    <p>Code: {productcode}</p>
                    <p>Quantity :{quantity }</p>
                </div>
                <div className={cx("productimg")}>
                    <img src={myarry[0]} alt=""  width="290px" height="290px"/>
                    {/* {myarry.map((url,index) => <img src={url} alt="" key={index} width="300px" height="300px"/>)} */}
                </div>
                <div className={ cx("productdescription")}>
                    <p>Sold : { sold}</p>
                    <p>Description :{description }</p>
                </div>
                <div className={ cx("productavdan")}>
                    <button>Buy</button>
                    <button>Add</button>
                    <button>Detail</button>
                </div>
            </section>
        </>

    )
    
};

export default ProductCard