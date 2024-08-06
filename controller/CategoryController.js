require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../model/Category')
var jwt = require('jsonwebtoken');


exports.Category_create = async function (req, res, next) {
    try {
      if (!req.body.name || !req.body.description  ) {
        throw new Error("Please Fill the data")
      }
      if (!req.body.createdAt) {
        req.body.createdAt = Date.now()
      }
      if (!req.body.updatedAt) {
        req.body.updatedAt = Date.now()
      }
      const Category_data = await Category.create(req.body)
      const Jwt_Category = jwt.sign({ id: Category_data._id },process.env.SECRET_CATEGORY)
      res.status(201).json({
        status: "sucess",
        message: "Category create",
        data: Category_data,
        Jwt_Category
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message,
      })
    }
  }

exports.Category_get = async function (req, res, next) {
    try {
      const Category_get = await Category.find()
      
      res.status(201).json({
        status: "sucess",
        message: "Puzzle Find",
        data: Category_get,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message,
      })
    }
  } 

exports.Category_Update = async function (req, res, next) {
    try {
      id = req.params.id
      if (req.body.updatedAt) {
        req.body.updatedAt = Date.now()
      } else if (!req.body.updatedAt) {
        req.body.updatedAt = Date.now()
      }
      const Category_get = await Category.findByIdAndUpdate(id, req.body)
      res.status(201).json({
        status: "sucess",
        message: "Category Update",
        data: Category_get,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message,
      })
    }
  }

exports.Category_Delete = async function (req, res, next) {
    try {
      id = req.params.id
      await Category.findByIdAndDelete(id)
      res.status(201).json({
        status: "sucess",
        message: "Category Delete",
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message:error.message,
      })
    }
  }

exports.Category_sequre = async function (req, res, next) {
    try {
        let Category_Token = req.headers.authorization
        if (!Category_Token) {
            throw new Error("TOken not found")
        }
        const Jwt_token = jwt.verify(Category_Token,process.env.SECRET_CATEGORY);
        console.table(Jwt_token)
        next()
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}