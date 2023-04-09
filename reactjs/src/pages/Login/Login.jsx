import React from 'react';
import { useState, useEffect,createContext, useContext } from "react";
import {useForm,} from "react-hook-form";
import styles from './Login.module.scss'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom';
import classNames from 'classnames/bind'
import Cookies from 'js-cookie';


const cx = classNames.bind(styles)


function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSubmit = async data => { 
        try {
                await axios.post('http://localhost:5000/api/user/login',{
                        useridO: data.userid,
                        passwordO: data.password,
                    }
                ).then(function (response){   
                    console.log(response.data);
                    const useridRP = response.data.userid;
                    const userToken = response.data.usertoken
                    console.log(useridRP)
                    Cookies.set(useridRP, userToken, { expires: 1, path: `/userpage/${useridRP}` });
                    navigate(`/userpage/${useridRP}` )
                })
            } catch (error) {
                console.log(error);
        }
    }

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('login')}>
                <div>
                    <label>UserID :</label>
                    <input
                        {...register("userid")}
                        type="text"
                        required
                        name="userid"
                    ></input>
                </div>
                <div>
                    <label>Password :</label>
                    <input
                        {...register("password")}
                        type="password"
                        required
                        name="password"
                    ></input>
                </div>
                <button
                    type="submit"
                    // onClick={ClickLogin}
                >LogIn</button>

            </div>
        </form >
    )
}
export default Login