require('dotenv').config();
const mongoose = require('mongoose');
const product = require('../model/product')
var jwt = require('jsonwebtoken');


exports.product_create = async function (req, res, next) {
  try {
    console.log(req.body);
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.category) {
      throw new Error("Please Fill the data")
    }
    if (!req.body.createdAt) {
      req.body.createdAt = Date.now()
    }
    if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const product_data = await product.create(req.body)
    const Jwt_product = jwt.sign({ id: product_data._id },process.env.SECRET_PRODUCT)
    res.status(201).json({
      status: "sucess",
      message: "product create",
      data: product_data,
      Jwt_product
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.product_get = async function (req, res, next) {
  try {
    const product_get = await product.find().populate('category')
    res.status(201).json({
      status: "sucess",
      message: "product Find",
      data: product_get,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.product_Update = async function (req, res, next) {
  try {
    id = req.params.id
    if (req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    } else if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const product_get = await product.findByIdAndUpdate(id, req.body)
    res.status(201).json({
      status: "sucess",
      message: "product Update",
      data: product_get,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.product_Delete = async function (req, res, next) {
  try {
    id = req.params.id
    await product.findByIdAndDelete(id)
    res.status(201).json({
      status: "sucess",
      message: "product Delete",
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.product_sequre = async function (req, res, next) {
  try {
    let product_Token = req.headers.authorization
    if (!product_Token) {
      throw new Error("TOken not found")
    }
    const Jwt_token = jwt.verify(product_Token,process.env.SECRET_PRODUCT);
    console.table(Jwt_token)
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}