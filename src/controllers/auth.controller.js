const response = require('../../helpers/formResponse')
const jwt = require('jsonwebtoken')
const authModel = require('../models/auth.model')
require('dotenv').config()
const authController = {
  // login:async(req,res)=>{
  //  try {
  //   const payload = {
  //     email: req.body.email,
  //     password: req.body.password
  //   }
  //   const result = await authModel.login(payload)
  //   console.log(result.email)
  //   return response(res, 200, result)
  //  } catch (error) {
  //   return response(res, 500)
  //  }}}

  login: async(req,res)=>{
    try {
      const {email, password} = req.body
      const payload = {email, password}
      const result = await authModel.login(payload)
      // console.log(result)
      if(result){
        //login berhasil
        delete result.password
        const token = jwt.sign(result, "JWT_PRIVATE_KEY")
        if(result.role==0 || result.role==1){
          return response(res, 200, { token: `Bearer ${token}` })
        }else {
          return response(res, 401, 'Role tidak valid' )
        }
      }else {
        // Login gagal
        return response(res, 401, 'Email atau password salah')
      }
    } catch (error) {
      console.error('Error saat melakukan login:', error);
      return response(res, 500)
    }
  }
}

module.exports = authController

// const response = require('../../helpers/formResponse')
// const jwt = require('jsonwebtoken')
// require('dotenv').config()
// const authController = {
//   login: async(req,res)=>{
//     try {
//       // const payload = {
//       //   email: req.body.email,
//       //   password: req.body.password
//       // }
//       const {email, password} = req.body
//       if(!email || !password){
//         return response(res, 401, "email & password required")
//       }
//       if(email==="admin@gmail.com" && password === "123"){
//         const user = {
//           email:"admin@gmail.com",
//           password:"123",
//           role:1
//         }
//         delete user.password //delete property password
//         //delete result.rows[0].password //delete password result model
//         const token = jwt.sign(user, "JWT_PRIVATE_KEY")
//         return response(res,200, {token: `Bearer ${token}`})
//       }
//       else if(email==="op@gmail.com" && password === "123"){
//         const user = {
//           email:"op@gmail.com",
//           password:"123",
//           role:2
//         }
//         delete user.password
//         const token = jwt.sign(user, "JWT_PRIVATE_KEY")
//         return response(res,200, { token: `Bearer ${token}`})
//       }else{
//         return response(res, 401, "email or password wrong")
//       }
//     } catch (error) {
//       return response(res, 500)
//     }
//   }
// }

// module.exports = authController