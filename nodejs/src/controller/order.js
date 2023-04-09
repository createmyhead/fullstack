import express from 'express';
const mysql = require('mysql2');
const router = express.Router();

import { connectToLocahostUser, connectToDB, connectToPool } from '../connectDB/connects';

const InsertOrderToTable = (req, res, next) => { 
    // buoc xu ly du lieu dau vao giao cho phia react nen chi can phia react khi goi api thif gui kem theo req
    const { useridsellO, productNameO, priceO, quantityO, SumO, useridorderO, imageO,productcodeO } = req.body;
    const createProductQuery = `INSERT INTO orders(useridsell, product , price, quantity, Sum , useridorder, image, productcode ) VALUES(?,?,?,?,?,?,?,?)`;
    connectToPool.getConnection(function (err, connect) {
        if (err) { throw err}{
        connect.query(createProductQuery, [
            useridsellO,
            productNameO,
            priceO,
            quantityO,
            SumO,
            useridorderO,
            imageO,
            productcodeO
        ], function (err, result) {
            if (err) { throw err }
            console.log(`created new user ${result} `);
            connectToPool.releaseConnection(connect);
            return res.status(200).json({
                useridsellO,
                productNameO,
                priceO,
                quantityO,
                SumO,
                useridorderO,
                imageO,
                productcodeO
            })
        })};
    });
}

module.exprts = {
    InsertOrderToTable
}