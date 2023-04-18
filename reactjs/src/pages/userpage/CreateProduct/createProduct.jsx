import styles from "./createProduct.module.scss"
import React from "react";
import { useReducer } from "react";
import classNames from 'classnames/bind'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import imageToBase64 from '../../../app/convertBase64'
const cx = classNames.bind(styles)

const InitState = {
    name: '',
    price: '',
    quantity: '',
    sold: '',
    description: '',
    image : []
};

function InputFormReducer(state, action) { 
    switch (action.type) { 
        case "UPDATE_FIELD":
            return {
                ...state,
                [action.field]: action.payload
            };
        case 'ADD_IMAGES':
            return {
                ...state,
                image: [...state.image, ...action.payload]
            }
        case "RESET_FORM":
            return InitState;
        default:
            return state;
    }
};


function CreateProduct() { 
    const [state, dispatch] = useReducer(InputFormReducer, InitState);
    const location = useLocation();
    const param = location.pathname;
    const userParam = param.split('/');
    // handel event
    async function handelSubmit (event) { 
        event.preventDefault();
        //convert data image and set to req.body.
        const imgInput =state.image[0];
        const newbase64Array = [];
        for (const file of imgInput) {
            const newb64 = await imageToBase64(file);
            newbase64Array.push(newb64);
            
        };
        const stringdata = JSON.stringify(newbase64Array)
        const DataSent = {
            productName: state.name,
            price: state.price,
            quantity: state.quantity,
            sold: state.sold,
            description: state.description,
            image: stringdata
        };
        // call API and sent data request
        const configAxios = {
            headers: {
                "Content-type": "application/json"
                        }};
        await axios.post(`http://localhost:5000/api/user/${userParam[2]}/product/create`,
        DataSent,configAxios
        )
    
        dispatch({ type: "RESET_FORM" });
    }
    return (
        
        <div className={cx('wrapper') }>
                <form onSubmit={handelSubmit } encType="multipart/form-data">
                    <div>
                        <label>
                            Product's Name :
                        </label>
                        <input
                            type="text"
                            value={state.name}
                            onChange={(event) =>
                                dispatch({
                                    type: "UPDATE_FIELD",
                                    field: "name",
                                    payload: event.target.value
                                })
                            }
                        ></input>
                    </div>
                    <div>
                        <label>
                            Price :
                        </label>
                        <input
                            type="text"
                            value={state.price}
                            onChange={(event) =>
                                dispatch({
                                    type: "UPDATE_FIELD",
                                    field: "price",
                                    payload: event.target.value
                                })
                            }
                        ></input>
                    </div>
                    <div>
                        <label>
                            Quantity :
                        </label>
                        <input
                            type="text"
                            value={state.quantity}
                            onChange={(event) =>
                                dispatch({
                                    type: "UPDATE_FIELD",
                                    field: "quantity",
                                    payload: event.target.value
                                })
                            }
                        ></input>
                    </div>
                    <div>
                        <label>
                         Sold :
                        </label>
                        <input
                            type="text"
                            value={state.sold}
                            onChange={(event) =>
                                dispatch({
                                    type: "UPDATE_FIELD",
                                    field: "sold",
                                    payload:  event.target.value,
                                })
                            }
                        ></input>
                    </div>
                    <div>
                        <label>
                            Description :
                        </label>
                        <input
                            type="text"
                            value={state.description}
                            onChange={(event) =>
                                dispatch({
                                    type: "UPDATE_FIELD",
                                    field: "description",
                                    payload: event.target.value
                                })
                            }
                        ></input>
                    </div>
                    <div>
                        <label>
                            Image Upload :
                        </label>
                        <input
                            multiple
                            type="file"
                            onChange={(event) =>
                                dispatch({
                                    type: "ADD_IMAGES",
                                    payload: [event.target.files]
                                })
                            }
                        ></input>
                        <div>Preview Image</div>
                    </div>
                    <button type="submit">
                        Create Product
                    </button>

                </form>
            </div>

    )
}

export default CreateProduct