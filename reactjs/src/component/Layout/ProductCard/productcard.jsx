import React from "react";
import styles from './productcard.module.scss';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const ProductCard = (props) => {
    const {id,userid,name,price,description,productcode,sold,quantity,image } = props;
    return (
        <>
            <section className={cx("products") }>
                <div className={cx('prodcutinfor') }>
                    <p>Product's Name : {name}</p>
                    <p>Price : {price }</p>
                    <p>Seller : {userid}</p>
                    <p>Code: {productcode}</p>
                    <p>Quan :{quantity }</p>
                </div>
                <div className={cx("productimg") }>
                    <p>{ image}</p>
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