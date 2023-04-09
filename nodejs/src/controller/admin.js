const express = require('express');
const mysql = require('mysql2');

import { connectToLocahostUser, connectToDB, connectToPool } from '../connectDB/connects'
import {createtableDB,createtableproduct,createTableReview,CreateTableOrderQueryComlum } from './querySQL'


const CreateDataBase = async (req, res, next) => {
    const nameDatabase = req.body.nameDB;
    if (!req.body.nameDB) {
        return res.status(400).json('Database name is necessary'), next(err)
    }
    connectToLocahostUser.connect(function (err) {
        if (err) throw err;
        console.log("connected");
        connectToLocahostUser.query(`CREATE DATABASE ${nameDatabase}`, function (err, result) {
            if (err) { throw err; }
            console.log("Database created")
            return res.status(200).json("Created Database");
        });
    });

};

const CreateTableUser = async (req, res, next) => {
    const tableName = req.body.nametable;
    if (!req.body.nametable) {
        return res.status(400).json("where is table name ?"), next(err)
    }
    connectToDB.connect(function (err) {
        if (err) throw err;
        console.log("connected");
        const tableUser = `CREATE TABLE ${tableName} ` + createtableDB;
        connectToDB.query(tableUser, function (err, result) {
            if (err) throw err;
            console.log("Table created")
            return res.status(200).json('created ')
        })
    });
   
};

const CreateTableProduct = async (req, res, next) => {
    const tableProduct = req.body.productTableName;
    if (!tableProduct) {
        return res.status(400).json('need the name of table')
    }
    connectToDB.connect(function (err) {
        if (err) throw err;
        console.log("connected");
        const tableproductname = `CREATE TABLE ${tableProduct}` + createtableproduct;
        connectToDB.query(tableproductname, function (err, result) {
            if (err) throw err;
            console.log("Table created")
        })
    });
    return res.status(200).json('created table Product');
};

const CreateTableReview = async (req, res, next) => {
    const tableReview = req.body.tableReviewName;
    if (!tableReview) {
        return res.status(400).json('you should set name for table')
    }
    connectToDB.connect(function (err) {
        if (err) throw err;
        console.log("connected");
        const tableReviewName = `CREATE TABLE ${tableReview} ` + createTableReview;
        connectToDB.query(tableReviewName, function (err, result) {
            if (err) throw err;
            console.log("Table created")
        })
    });
    return res.status(200).json('created table review');
};

const CreateTableOrderProduct = async (req, res, next) => {
    const tableOrder = req.body.nametableorder;
    if (!tableOrder) {
        return res.status(400).json('need a name for table')
    }
    connectToDB.connect(function (err) {
        if (err) throw err;
        console.log("connected");
        const createTableOrderQuery = `CREATE TABLE ${tableOrder}` + CreateTableOrderQueryComlum;
        console.log(createTableOrderQuery)
        connectToDB.query(createTableOrderQuery, function (err, result) {
            if (err) { throw err };
            console.log("Table created") 
        })     
    })
    return res.status(200).json('created table order')
};

const GetAllUserList = async (req, res, next) => {
    connectToDB.query(`SELECT * FROM users `, (function (err, result) {
        if (err) { throw err };
        console.log(result);
        return res.status(200).json(result)
    }))
};

module.exports = {
    CreateDataBase,
    CreateTableUser,
    CreateTableProduct,
    CreateTableReview,
    CreateTableOrderProduct,
    GetAllUserList,

}