import React from 'react';
import classNames from 'classnames/bind'
import styles from './HomeComponent.module.scss'
import { useEffect,useState } from 'react';
import axios from 'axios';
import ProductCard from '../../component/Layout/ProductCard/productcard';

const cx = classNames.bind(styles)

function HomePage() {
    const [productlist, setproductlist] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/home/product').then(
            response => {
                setproductlist(response.data.result); 
            }).catch(error => { console.log(error) })         
    }, []
    );
    return (
        <div className={cx("homepage")}>
            {productlist.map(item => (
                <div className={cx("prodcutcard") } key={item.id}>
                    <ProductCard id={item.id}
                        name={item.product}
                        price={item.price}
                        quantity={item.quantity}
                        image={item.image}
                        description={item.description}
                        sold={item.solde}
                        userid={item.userid}
                        productcode={item.productcode }
                        
                    />
                </div>
            )) }
        </div>
    )
}
export default HomePage