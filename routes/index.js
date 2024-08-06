require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Category = require('../model/Category')
const Product = require('../model/product')
const User = require('../model/User')
const Order = require('../model/order')
var jwt = require('jsonwebtoken');
const CategoryController = require('../controller/CategoryController')
const Ordercontroller = require('../controller/OrderController')
const Productcontroller = require('../controller/ProductController')
const Usercontroller = require('../controller/UserController')


/* User */
router.post('/UserCreate',Usercontroller.User_create);

router.get('/UserGet',Usercontroller.User_sequre,Usercontroller.User_get);

router.put('/UserUpdate/:id',Usercontroller.User_sequre,Usercontroller.User_Update);

router.delete('/UserDelete/:id',Usercontroller.User_sequre,Usercontroller.User_Delete);

// Category

router.post('/Category',CategoryController.Category_create);

router.get('/CategoryData',CategoryController.Category_sequre,CategoryController.Category_get);

router.put('/CategoryUpdate/:id',CategoryController.Category_sequre,CategoryController.Category_Update);

router.delete('/CategoryDelete/:id',CategoryController.Category_sequre,CategoryController.Category_Delete);

// product

router.post('/ProductCreate',Productcontroller.product_create);

router.get('/ProductGet',Productcontroller.product_sequre,Productcontroller.product_get);

router.put('/ProductUpdate/:id',Productcontroller.product_sequre,Productcontroller.product_Update);

router.delete('/ProductDelete/:id',Productcontroller.product_sequre,Productcontroller.product_Delete);



// Order

router.post('/OrderCreate',Ordercontroller.Order_create);

router.get('/OrderGet',Ordercontroller.Order_sequre,Ordercontroller.Order_get);

router.put('/OrderUpdate/:id',Ordercontroller.Order_sequre,Ordercontroller.Order_Update);

router.delete('/OrderDelete/:id',Ordercontroller.Order_sequre,Ordercontroller.Order_Delete);


module.exports = router;
