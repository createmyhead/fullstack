import express from 'express';
const mysql = require('mysql2');

export const connectToLocahostUser = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: ""
    }
);

export const connectToDB = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "userdb"
    }
);

export const connectToPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'userdb',
    waitForConnections: true,
    connectionLimit: 10,
    idleTimeout: 60000,
});

