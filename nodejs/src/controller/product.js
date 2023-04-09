import express from 'express';
const mysql = require('mysql2');
const router = express.Router();

import { connectToLocahostUser, connectToDB, connectToPool } from '../connectDB/connects';


const CreateNewProduct = (req, res, next) => {
    const { productName, price, quantity, sold, description, image } = req.body;
    if (!productName || !price || !quantity || !description) {
        return res.status(400).json('information is not full')
    }
    const soldOnQueryValue = sold || 0;
    const userIDCreateValue = req.params.userid;
    const productCodeOnQueryValue = userIDCreateValue + `-` + productName;
    const createProductQuery = `INSERT INTO products(userid,product,price,quantity,sold,description,image,productcode) VALUES(?,?,?,?,?,?,?,?)`;
    connectToPool.getConnection(function (err, connect) {
        if (err) { throw err } {
            connect.query(createProductQuery, [
                userIDCreateValue,
                productName,
                price,
                quantity,
                soldOnQueryValue,
                description,
                image,
                productCodeOnQueryValue
            ], function (err, result) {
                if (err) { throw err }
                console.log(`created new user ${result} `);
                connectToPool.releaseConnection(connect);
                return res.status(200).json({
                    userIDCreateValue,
                    productName,
                    price,
                    quantity,
                    soldOnQueryValue,
                    description,
                    image,
                    productCodeOnQueryValue
                })
            })
        };
    });

};
const GetAllProduct = (req, res, next) => {
    const queryall = `SELECT * FROM products`;
    connectToDB.query(queryall, function (err, result) {
        if (err) { throw err }
        console.log(result)
        return res.status(200).json({ result })
    })
};

const GetAllProductListOfUser = (req, res, next) => {
    const userIDFromParams = req.params.user;
    const AllProductOfUserQuery = `SELECT * FROM products WHERE userid = ?`;
    connectToDB.query(AllProductOfUserQuery, [userIDFromParams], function (err, result) {
        if (err) { throw err }
        console.log(result)
        return res.status(200).json({ result })
    })
};

const EditProduct = (req, res, next) => {
    const { nameP, priceP, descriptionP, imageP, productcodeP } = req.body;
    const productNeedUpdate = productcodeP || req.params.productcode;
    const newProductCode = `${req.params.userid}-${nameP}`;
    const UpdateProductQuery = `UPDATE products SET product=?, price=?, description=?, image=?,productcode=? WHERE productcode = ? `;
    connectToPool.getConnection(function (err, connect) {
        if (err) { throw err } {
            connect.query(UpdateProductQuery, [
                nameP,
                priceP,
                descriptionP,
                imageP,
                newProductCode,
                productNeedUpdate
            ], function (err, rerult) {
                if (err) { throw err }
                console.log("update ok");
                connectToPool.releaseConnection(connect);
                return res.status(200).json('update ok')
            })
        }
    })
};

const DeleteProduct = (req, res, next) => {
    const { productDelete } = req.body;
    const useridU = req.params.userid;
    connectToDB.query(`DELETE FROM products WHERE userid=? AND productcode = ?`, [useridU, productDelete], function (err, result) {
        if (err) { throw err }
        console.log('Deleted !');
        return res.status(200).json(`Deleted ${productDelete}`)
    })

}
module.exports = {
    CreateNewProduct,
    GetAllProduct,
    GetAllProductListOfUser,
    EditProduct,
    DeleteProduct
}