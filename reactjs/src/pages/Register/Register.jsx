import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import classNames from 'classnames/bind'
import styles from './Register.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles)

function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => { 
        try { 
            await axios.post('http://localhost:5000/api/user/register',
                {
                    userid: data.userid,
                    email: data.email,
                    password: data.password,
                    roleid: data.roleid
                }, ).then(function (response) {
                    console.log(response);                  
                }).then(navigate('/'));              
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('register')}> 
                <div>
                    <label className="label">UserID :</label>
                    <input
                        className="input"
                        {...register("userid")}
                        type="text"
                        required
                        name="userid"
                    ></input>
                </div>

                <div>
                    <label className="label">Email :</label>
                    <input
                        className="input"
                        {...register("email")}
                        required
                        type="email"
                        name="email"

                    ></input>
                </div>
                <div>
                    <label className="label" >Password :</label>
                    <input
                        className="input"
                        {...register("password")}
                        type="password"
                        required
                        name="password"

                    ></input>
                </div>
                <div>
                    <label className="label">Role :</label>
                    <input
                        className="input"
                        {...register("roleid")}
                        type="text"
                        name="roleid"

                    ></input>
                </div>
                
                <button type="submit">Register</button>

            </div>
        </form >
    )
}
export default Register