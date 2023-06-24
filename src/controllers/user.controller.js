const userModel = require('../models/user.model')
const response = require('../../helpers/formResponse')
const {v4: uuidv4} = require('uuid')
const bycrpt = require('bcrypt')

const userController = {
  get:async(req,res)=>{
    try {
      const result = await userModel.get()
      return response(res, 200, result)
    } catch (error) {
      return response(res, 500)
    }
  },
  getDetail:async(req,res)=>{
    try {
      const payload = {id: req.params.id}
      const result = await userModel.getDetail(payload)
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
      id_user : uuidv4(),
      fullname: req.body.fullname,
      email: req.body.email,//reguler expression email
      password: bycrpt.hashSync(req.body.password, 11),
      //comparesync
      picture: req.file.filename,
      role: req.body.role
    }
    const result = await userModel.add(payload)
    return response(res, 201, result)
   } catch (error) {
    return response(res, 500)
   }
  },
  update:async(req,res)=>{
    try {
      const payload = {
        id : req.params.id,
        fullname: req.body.fullname,
        email: req.body.email,
        password: bycrpt.hashSync(req.body.password, 11),
        picture: req.file.filename,
        role: req.body.role
      }
      const result = await userModel.update(payload)
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
      result = await userModel.remove(payload)
      return response(res, 200, result)
    } catch (error) {
      return response(res, 500)
    }
  }
}

module.exports = userController