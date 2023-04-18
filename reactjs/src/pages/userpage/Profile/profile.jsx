import styles from "./profile.module.scss"
import React from "react";
import { useReducer, useContext} from "react";
import classNames from 'classnames/bind'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import imageToBase64 from '../../../app/convertBase64'
import userDataAfterLogin from '../StoreUserData/userDataContext'
const { Buffer } = require('buffer');


const cx = classNames.bind(styles)
const InitState = {
    userid: "",
    email: "",
    avatar: [],
    preview: [],
    loading:false,
};


const ViewAndEditProfile = (state, action) => { 
   
    switch (action.type) {
       
        case 'SET_IMAGE':
            return {
                ...state,
                avatar:action.payload
            };
        case 'SET_PREVIEW':
            return {
                ...state,
                preview:action.payload
            }
        case 'LOADING_IMAGE':
            return {
                ...state,
                loading : action.payload
            }
        case 'SET_ERROR':
            return {...state,error: action.payload}
        default:
            return state;
    }
}

const MyProfile = () => {
    const dataUserFromLogin = useContext(userDataAfterLogin)
    const { userid, email, roleid, usertoken, avatar } = dataUserFromLogin;
    const base64String = new Buffer(avatar, 'base64').toString('binary');
    const myarry = JSON.parse(base64String);
    console.log(myarry)
    const location = useLocation();
    const param = location.pathname;
    const userParam = param.split('/');
    const [state, dispatch] = useReducer(ViewAndEditProfile, InitState);
    
    const hadleUpLoadImage =(event)=> { 
        const file = event.target.files[0];
        dispatch({ type: 'SET_IMAGE', payload: file });
        dispatch({type: 'SET_PREVIEW', payload : URL.createObjectURL(file)})
    }
    const  hadleUpLoad = async(event)=> { 
        event.preventDefault();
        dispatch({ type: 'LOADING_IMAGE', payload: true });
        try {
            const dataImage = state.avatar;
            const newb64 = await imageToBase64(dataImage);
            const stringdata = JSON.stringify(newb64);
            console.log(stringdata);
            const avatarData = { avatar: stringdata };
            const configAxios = {
                headers: {
                    "Content-type": "application/json"
                            }};
            await axios.put(`http://localhost:5000/api/user/${userParam[2]}/avatar`,avatarData,configAxios)
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.messsage });
        }
        dispatch({type: 'LOADING_IMAGE', payload: false})
        
    }
    return (
        <form onSubmit={hadleUpLoad }>
            <div>
                <div>
                    <label>user ID : </label>
                    <div>{userid}</div>
                </div>
                <div>
                    <label>Email : </label>
                    <div>{email}</div>
                </div>
            </div>
            <div>
                <label>Avatar :</label>
                {/* <img src={ } alt ="" width="50px" height="50px" /> */}
                <div>
                    <input
                        onChange={hadleUpLoadImage}
                        type="file"
                    ></input>
                    {state.preview && <img src={state.preview } alt='preview' width="50px" height='50px' />}
                </div>
                <button
                    type="submit" disabled={!state.avatar || state.uploading}>
                    {state.uploading ? 'Uploading...' : 'Upload'}
                </button>
                {state.error && <p>{state.error}</p>}
            </div>
        </form>
    )

};

export default MyProfile