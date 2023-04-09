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
            if (!useridO || !passwordO) {
                return res.status(400).json('please ! input both userid and password'), next(err)
            };  
            connectToPool.getConnection(function (err, connect) {
                const findUserId = `SELECT * FROM users WHERE userid = ?`
                connect.query(findUserId, [useridO], function (err, result1) {
                    if (err) { throw err }
                    const [Obj] = result1;
                    const { userid, email, password, roleid, } = Obj;
                    const checkPassword = bcrypt.compareSync(passwordO, password)
                    if (useridO !== userid) {
                        return res.status(400).json('userid is not exist'), next(err)
                    }
                    if (checkPassword !== true) {
                        return res.status(400).json('password is wrong'), next(err)
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
                        } catch (err) { console.log(err) } 
                     };
                    return res.status(200).json({
                        userid,
                        email,
                        roleid,
                        usertoken,
                        userRefreshToken,

                    })
                })
            })
}

export default Login
