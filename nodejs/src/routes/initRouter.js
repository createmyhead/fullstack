import express from 'express';
const router = express.Router();
const myModule = require('../controller/admin');
import Login from '../service/login'
const moduleUser = require('../controller/users');
const moduleProduct = require('../controller/product')


const initRouter = (app) => {
    
    // create database 
    router.post('/admin/createdata', myModule.CreateDataBase);
    // create table on database
    router.post('/admin/createtableuser',  myModule.CreateTableUser);
    // create table product
    router.post('/admin/tableproduct', myModule.CreateTableProduct);
    // create table review
    router.post('/review/createtable', myModule.CreateTableReview);
    //create table order
    router.post('/admin/tableorder', myModule.CreateTableOrderProduct )
    // list user
    router.get('/admin/user/list', myModule.GetAllUserList);
    //Login
    router.post('/user/login', (req, res, next) => {
        Login(req, res, next);
    });
    // Register
    router.post('/user/register', moduleUser.CreateNewUser);
    // Upload avatar
    router.put('/user/:userid/avatar', moduleUser.UpLoadAvatar)
    // Get all Infro of Userid
    router.get('/user/:userid/information', moduleUser.GetInforUser)
    // Edit User
    router.put('/user/:userid', moduleUser.EditUser);
    //Delete user by userid 
    router.delete('/user/delete', moduleUser.DeleteUser);
    // create product
    router.post('/user/:userid/product/create', moduleProduct.CreateNewProduct);
    // get products list
    router.get('/userid/:user/product/list', moduleProduct.GetAllProductListOfUser);
    // get all product
    router.get('/home/product',moduleProduct.GetAllProduct)
    // edit product
    router.put('/userid/:userid/product/:productcode', moduleProduct.EditProduct);
    //delete product
    router.delete('/userid/:userid/product/delete',  moduleProduct.DeleteProduct)

    
    return app.use('/api',router)
};

export default initRouter;