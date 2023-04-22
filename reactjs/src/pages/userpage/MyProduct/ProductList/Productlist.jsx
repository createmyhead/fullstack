import React from "react";
import { useReducer, useContext} from "react";
import styles from './Productlist.module.scss';
import classNames from 'classnames/bind'
const { Buffer } = require('buffer');
const cx = classNames.bind(styles)

const initStateProduct = {
    productname: "",
    price: "",
    description: "",
    quantity: "",
    sold: "",
    image: [],
    preview: [],
    loading: false
};
const ProductEditReducer = (state, action) => { 
    switch (action.type) {
        case "UPDATE_NAME": return {...state, productname :action.payload };
        case "UPDATE_PRICE": return {...state, price :action.payload};
        case "UPDATE_DESCRIPTION": return {...state, description:action.payload};
        case "UPDATE_QUANTITY": return {...state, quantity :action.payload};
        case "UPDATE_SOLD": return {...state, sold :action.payload};
        case "UPDATE_IMAGE": return {...state, image: action.payload};
        case "PREVIEW_IMAGE": return { ...state, preview  :action.payload};
        case "LOADING_IMAGE": return { ...state, loading: action.payload };
        default: return state;  
    }

}

const ProductList = (props) => {
    const { id, userid, name, price, description, productcode, sold, quantity, image } = props;
    const base64String = new Buffer(image, 'base64').toString('binary');
    const myarry = JSON.parse(base64String);
    const [state,dispatch] = useReducer(ProductEditReducer,initStateProduct)
    
    function handleUpLoadImage (event){
        const file = event.target.files[0];
        console.log(`event.target.files`,event.target.files)
        dispatch({type: "UPDATE_IMAGE", payload: file });
        // dispatch({type:"PREVIEW_IMAGE", payload: URL.createObjectURL() })
        console.log(file)
    }

    const handleClickSave = () => {

    }
    return (
        <div className={cx('warraper') }>
            <div className={cx('imageP') }>
            {myarry.map((url,index) => <img src={url} alt="" key={index} width="200px" height="200px"/>)}
            </div>
            <div className={cx('EditDelete') }>
                <button>Delete Product</button>
                <div>
                    <div>
                        <label>Name : </label>
                        <input
                            type="text"
                            value={state.productname }
                            placeholder={name }
                            onChange={(e) => { dispatch({type:'UPDATE_NAME', payload: e.target.value}) } }
                        ></input>
                    </div>
                    <div>
                        <label>Price : </label>
                        <input
                            value={state.price}
                            type="text"
                            placeholder={price }
                            onChange={(e) => { dispatch({type:"UPDATE_PRICE", payload: e.target.value}) } }
                        ></input>
                    </div>
                    <div>
                        <label>Desciption:</label>
                        <input
                            value={state.description}
                            type="text"
                            placeholder={description }
                            onChange={(e) => { dispatch({type:"UPDATE_DESCRIPTION", payload: e.target.value}) } }
                        ></input>
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input
                            value={state.quantity}
                            placeholder={quantity}
                            onChange={(e) => { dispatch({type:"UPDATE_QUANTITY", payload: e.target.value}) } }
                        ></input>
                    </div>
                    <div>
                        <label>Sold :</label>
                        <input
                            value={state.sold }
                            type="text"
                            placeholder={sold  }
                            onChange={(e) => { dispatch({type:"UPDATE_SOLD", payload: e.target.value}) } }
                        ></input>
                    </div>
                    <div>
                        <label>New Image</label>
                        <input
                            multiple
                            onChange={handleUpLoadImage}
                            type="file"
                        ></input>
                        <div>preview Image</div>
                    </div>
                    <button
                        onClick={handleClickSave}
                    >Save</button>
                </div>
            </div>
        </div>
    )
}
export default ProductList;