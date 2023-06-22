const response = require('../helpers/formResponse')
const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = {
  authentication:(req,res,next)=>{
    try {
      const bearerToken = req.headers.token
      if(!bearerToken){
        return response(res, 401, "Token is required")
      }
      const token = bearerToken.split(" ")[1]
      // console.log(token)
      // const decode = jwt.decode(token)
      /*decode berfungsi untuk memverifikasi token kita, jika valid akan di decode
      jika tidak valid masuk ke blok catch*/
      const decode = jwt.verify(token, 'JWT_PRIVATE_KEY')
      //menyimpan data dari decode supaya bisa dipakai di authoriztion, pakai req karna di function sama-sama ada req. 
      req.dataUser = decode
      //console.log(decode)
      //next syntax js untuk masuk ke step selanjutnya di routing
      next()
    } catch (error) {
      return response(res,401, error)
    }
  },
  authorizationAdmin:(req,res,next)=>{
    try {
      if(req.dataUser.role != 0){
        return response(res, 401, "you dont have access, only admin")
      }
      next()
    } catch (error) {
      return response(res, 401, error)
    }
  },
  authorizationOperator:(req,res,next)=>{
    try {
      if(req.dataUser.role != 1){
        return response(res, 401, "you dont have access, only operator")
      }
      next()
    } catch (error) {
      return response(res, 401, error)
    }
  }
}