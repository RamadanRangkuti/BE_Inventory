const productModel = require('../models/product.model')
const {v4: uuidv4} = require('uuid')
const response = require('../../helpers/formResponse')

const productController = {
  //pagination all
  //search name product
  //sort harga
  get:async(req,res)=>{
    try {
      const { search, sortField, sortBy, page, limit } = req.query;
      const query = { search, sortField, sortBy, page, limit };
      const result = await productModel.get(query)
      return response(res, 200, result)
    } catch (error) {
      return response(res, 500, error.message)
    }
  },

  getDetail:async(req,res)=>{
    try {
      const payload = {id : req.params.id}
      const result = await productModel.getDetail(payload)
      if(result!=null){
        return response(res, 200, result)
      }else{
        return response(res, 404, "Sorry data not found please check your input ID")
      }
    } catch (error) {
      return response(res, 500)
    }
  },
  add:async(req,res)=>{
    try {
      const payload = {
        id_product: uuidv4(),
        names:req.body.names,
        price:req.body.price,
        description:req.body.description,
        picture:req.file.filename,
        stock:req.body.stock
       }
       const result = await productModel.add(payload)
       //return res.status(201).send({message:'succes',data:result})
       return response(res, 201, result)
    } catch (error) {
        return response(res, 500)
    }
  },
  update:async(req,res)=>{
    //delete file when update
    //get dari productdetail dulu
    //fs remove file
    //hapus dulu baru update
    try {
      const payload = {
        id: req.params.id,
        names:req.body.names,
        price:req.body.price,
        description:req.body.description,
        picture:req.file.filename,
        stock:req.body.stock
      }
      const result = await productModel.update(payload)
      return response(res, 201, result)
    } catch (error) {
      return response(res, 500)
    }
  },
  stockIn:async(req,res)=>{
    try {
      const payload={
        id_product:req.params.id,
        stock:req.body.stock
      }
      const result = await productModel.updateStock(payload)
      return response(res, 201, result)
    } catch (error) {
      return response(res, 500)
    }
  },
  remove:async(req,res)=>{
    try {
      const payload = {
        id: req.params.id
      }
      result = await productModel.remove(payload)
      return response(res, 200, result)
    } catch (error) {
      return response(res, 500)
    }
  }
}

module.exports = productController