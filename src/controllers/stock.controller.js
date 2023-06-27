const stockModel = require('../models/stock.model')
const response = require('../../helpers/formResponse')
const { v4: uuidv4 } = require('uuid')
const productModel = require('../models/product.model')

const stockController = {
  stockIn: async (req, res) => {
    try {
      const payload = {
        id_stock: uuidv4(),
        dates: new Date().toISOString().slice(0, 10),
        product_id: req.body.product_id,
        type: 1,
        user_id: req.body.user_id,
        note: req.body.note,
        qty: req.body.qty
      }
      const idProduct = {
        id: req.body.product_id
      }
      const product = await productModel.getDetail(idProduct)
      // console.log(product)
      // console.log(product.stock)
      const request = {
        id_product: req.body.product_id,
        stock: product.stock + req.body.qty// req.body.qty
      }
      // console.log(request)
      const insertStock = await stockModel.insert(payload)
      const updateStock = await productModel.stockIn(request)
      return response(res, 201, { insertStock, updateStock })
    } catch (error) {
      return response(res, 500, error.message)
    }
  },
  stockOut: async (req, res) => {
    try {
      const payload = {
        id_stock: uuidv4(),
        dates: new Date().toISOString().slice(0, 10),
        product_id: req.body.product_id,
        type: 2,
        user_id: req.body.user_id,
        note: req.body.note,
        qty: req.body.qty
      }
      // console.log("TES")
      const idProduct = {
        id: req.body.product_id
      }
      const product = await productModel.getDetail(idProduct)
      // console.log(product)
      const request = {
        id_product: req.body.product_id,
        stock: product.stock - req.body.qty
      }
      const insertStock = await stockModel.insert(payload)
      const updateStock = await productModel.stockOut(request)
      return response(res, 201, { insertStock, updateStock })
    } catch (error) {
      return response(res, 500, error.message)
    }
  },
  stockEdit: async (req, res) => {
    try {
      const payload = {
        id_stock: uuidv4(),
        dates: new Date().toISOString().slice(0, 10),
        product_id: req.body.product_id,
        type: 3,
        user_id: req.body.user_id,
        note: req.body.note,
        qty: req.body.qty
      }
      const idProduct = {
        id: req.body.product_id
      }
      const product = await productModel.getDetail(idProduct)
      // console.log(product)
      const request = {
        id_product: req.body.product_id,
        stock: product.stock = req.body.qty
      }
      console.log(request.stock)
      const insertStock = await stockModel.insert(payload)
      const updateStock = await productModel.stockEdit(request)
      return response(res, 201, { insertStock, updateStock })
    } catch (error) {
      return response(res, 500, error.message)
    }
  }
}

module.exports = stockController
