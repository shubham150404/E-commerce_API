require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('../model/order')
var jwt = require('jsonwebtoken');


exports.Order_create = async function (req, res, next) {
  try {
    if (!req.body.user || !req.body.products || !req.body.totalPrice) {
      throw new Error("Please Fill the data")
    }
    
    if (!req.body.createdAt) {
      req.body.createdAt = Date.now()
    }
    if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const Order_data = await Order.create(req.body)
    const Jwt_Order = jwt.sign({ id: Order_data._id },process.env.SECRET_ORDER)
    res.status(201).json({
      status: "sucess",
      message: "Order create",
      data: Order_data,
      Jwt_Order
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Order_get = async function (req, res, next) {
  try {
    const Order_get = await Order.find().populate('user').populate('products')
    res.status(201).json({
      status: "sucess",
      message: "Order Find",
      data: Order_get,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Order_Update = async function (req, res, next) {
  try {
    id = req.params.id
    if (req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    } else if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const Order_get = await Order.findByIdAndUpdate(id, req.body)
    res.status(201).json({
      status: "sucess",
      message: "Order Update",
      data: Order_get,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Order_Delete = async function (req, res, next) {
  try {
    id = req.params.id
    await Order.findByIdAndDelete(id)
    res.status(201).json({
      status: "sucess",
      message: "Order Delete",
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Order_sequre = async function (req, res, next) {
  try {
    let Order_Token = req.headers.authorization
    if (!Order_Token) {
      throw new Error("TOken not found")
    }
    const Jwt_token = jwt.verify(Order_Token,process.env.SECRET_ORDER);
    console.table(Jwt_token)
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}