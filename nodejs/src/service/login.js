import express from 'express';
const mysql = require('mysql2');
const router = express.Router();
const jwt = require('jsonwebtoken');
import { createClient } from 'redis';
import Cookies from 'js-cookie'
import { connectToLocahostUser,connectToDB,connectToPool} from '../connectDB/connects'
const bcrypt = require('bcrypt');
const saltRounds = 10;

import createToken from '../auth/createJWT'
import refreshToken from '../auth/refreshJWT'

const Login = async (req, res, next) => {
    const { useridO, passwordO, } = req.body;
    connectToPool.getConnection(function (err, connect) {
        if (err) {
            console.log('Error connecting to database pool:', err);
            return res.status(500).json('Internal server error');
        }
        const findUserId = `SELECT * FROM users WHERE userid = ?`;
        connect.query(findUserId,[useridO],function (err, result1) {
            if (err) {
                console.log('Error querying database:', err);
                connectToPool.releaseConnection(connect);
                return res.status(500).json('Internal server error');
            }
            if (result1.length === 0) {
                console.log('User not found:', useridO);
                connectToPool.releaseConnection(connect);
                return res.status(400).json('User not found');
            }
            console.log("abc",result1);
            const Obj = {...result1};
            const { userid, email, password, roleid, avatar } = Obj[0];
            const checkPassword = bcrypt.compareSync(passwordO, password);
            if (checkPassword !== true) {
                console.log('Incorrect password for user:', useridO);
                connectToPool.releaseConnection(connect);
                return res.status(400).json('Incorrect password');
            }
            connectToPool.releaseConnection(connect);
            const usertoken = createToken(userid, roleid);
            const userRefreshToken = refreshToken(userid, roleid);
            async(userid, usertoken)=> {
                try {
                        const client = createClient();
                        client.on('error', err => console.log('Redis Client Error', err));
                        await client.connect();
                        await client.set(userid, usertoken, {
                                EX: 10,
                                NX: true
                        });
                        await client.disconnect();
                } catch (err) { 
                    console.log('Error storing token in Redis:', err);
                    connectToPool.releaseConnection(connect);
                    return res.status(500).json('Internal server error');
                }
            };
            connectToPool.releaseConnection(connect);
            return res.status(200).json({
                userid,
                email,
                roleid,
                usertoken,
                userRefreshToken,
                avatar,
                })  
    })}  
)}


export default Login
