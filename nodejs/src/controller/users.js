import express from 'express';
const mysql = require('mysql2');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer  = require('multer')

import { connectToLocahostUser,connectToDB,connectToPool} from '../connectDB/connects'
const bcrypt = require('bcrypt');
const saltRounds = 10;


const CreateNewUser = (req, res, next) => {
    const { userid, email, password, roleid } = req.body;
    if (!userid || !email || !password) {
        return res.status(400).json('please ! input full information')};
    connectToPool.getConnection(function (err, connect) {
            const findUserId = `SELECT userid FROM users WHERE userid = ?`
            connect.query(findUserId, [userid], function (err, result1) {
                if (err) { throw err }
                console.log(result1);
                if (result1.length === 1) {
                    return res.status(400).json('userid is exist'), next(err)
                }
                const findUserEmail = `SELECT email FROM users WHERE email =?`;
                connect.query(findUserEmail, [email], function (err, result2) {
                    if (err) { throw err }
                    console.log(result2);
                    if (result2.length === 1) {
                        return res.status(400).json('email is exist'), next(err)
                    }
             
                    const newroleid = roleid|| 'usermember';
                    const valueimage =  'no avatar';
                    const createUsers = `INSERT INTO users(userid, email, password, avatar, roleid ) VALUES(?,?,?,?,?)`;
                    const hashPasswod = bcrypt.hashSync(password, saltRounds)
                    connect.query(createUsers, [userid, email, hashPasswod, valueimage, newroleid], function (err, result) {
                        if (err) { throw err }
                        console.log(`created new user ${result} `);
                        connectToPool.releaseConnection(connect);
                        return res.status(200).json(`${userid}, ${email},${newroleid} `)
                    })
                })
            })
        });
};
const EditUser = (req, res, next) => {
    const { emailU, passwordU, useridU } = req.body;
    const userIDNeedUpdate = req.params.userid || useridU;
    const hashNewPass = bcrypt.hashSync(passwordU, saltRounds)
    const updateUserQuery = `UPDATE users SET email=?,password=? WHERE userid=?`;
    connectToPool.getConnection(function (err, connect) {
        if (err) { throw err } {
            connect.query(updateUserQuery, [
                emailU,
                hashNewPass,
                userIDNeedUpdate
            ], function (err, result) {
                if (err) { throw err }
                console.log(`updated !`)
                connectToPool.releaseConnection(connect);
                return res.status(200).json(`Updated !new email = ${emailU} and new password =${passwordU}`)
        
            })
        }
    })
};
const DeleteUser = (req, res, next) => { 
    const { useridDelete } = req.body;
    connectToPool.getConnection(function (err, connect) {
        if (err) { throw err } {
            connect.query(`DELETE FROM users WHERE userid=? `, [useridDelete], function (err, result) {
                if (err) { throw err }
                connect.query(`DELETE FROM products WHERE userid=? `, [useridDelete], function (err, result) {
                    if (err) { throw err }
                    console.log('Deleted !');
                    return res.status(200).json(`Deleted ${useridDelete} and all product of userid  ${useridDelete} `)
                })
                })   
        }
    })
}
const UpLoadAvatar = (req, res, next) => {
    const { avatar } = req.body;
    const useidFromParams = req.params.userid ;
    console.log(useidFromParams)
    const queryInsertavatar = `UPDATE users SET avatar=? WHERE userid=?`
    connectToPool.getConnection(function (err, connect) {
        if (err) { throw err } {
            connect.query(queryInsertavatar,[avatar,useidFromParams] ,function (err, result) {
                if (err) { throw err }
                console.log(`updated !`)
                connectToPool.releaseConnection(connect);
                return res.status(200).json(`Updated !new avatar `)
            })
        }
    })

}
const GetInforUser = async (req, res, next) => { 
    const useridInPut = req.params.userid;
    const queryGetInfor = `SELECT * FROM users WHERE userid = ?`;
    connectToDB.query(queryGetInfor, [useridInPut], function (err, result) {
        if (err) { throw err }
        return res.status(200).json({ result })
    })
}


module.exports = {
    CreateNewUser,
    EditUser,
    DeleteUser,
    UpLoadAvatar,
    GetInforUser,
}