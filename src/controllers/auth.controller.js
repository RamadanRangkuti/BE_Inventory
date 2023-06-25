const response = require('../../helpers/formResponse')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authModel = require('../models/auth.model')
require('dotenv').config()
const {JWT_PRIVATE_KEY} = process.env
const authController = {
  login: async(req,res)=>{
    try {
      const {email, password} = req.body
      //const payload = {email: email, password:password}
      const result = await authModel.login(email)
      //console.log({"result email" : result.email})
      //console.log(result)
      if(email.length <=0 || password.length<=0){
        return response(res, 500, "email or password required!!!")
      }
      if(!result){
        return response(res, 500, "unregistered e-mail!!!")
      }     
      //console.log(verify)
      //console.log(password)
       // verifikasi password yang sudah dihashing saat login dengan password dari request.body mengembalikan nilai boolean
      const verify = bcrypt.compareSync(password, result.password) 
      if(!verify){
        return response(res, 500, "Wrong Password!!!")
      }
      delete result.password
      const token = jwt.sign(result, JWT_PRIVATE_KEY)
      //console.log(token)
      return response(res,200, { token:`Bearer ${token}`})
    } catch (error) {
      console.error('Error saat melakukan login:', error);
      return response(res, 500, )
    }
  }
}

module.exports = authController
