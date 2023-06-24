// const db = require('../../helpers/connection')
// const bcrypt = require('bcrypt')
// const authModel = {
//   login:({email, password})=>{
//     console.log('Email:', email)
//     console.log('Password:', password)
//     return new Promise((resolve, reject) => {
//       db.query(`SELECT email, password, role FROM users WHERE email=$1`,[email],(err, result)=>{
//         if(err){
//           reject(err.message)
//         }else{
//           if (result.rows.length===0){
//             reject ('wrong email or password')
//           }else{
//             bcrypt.compare(password, result.rows[0].password, (err, hashingResult)=>{
//               //console.log(result)
//               if(err){
//                 reject('wrong password!')
//               }
//               if(!hashingResult){
//                 reject('wrong paswworddddddd!')
//               }else{
//                 resolve(result.rows[0])
//               }
//             })
//           }
//         }
//       })
//     })
//   }
// }

// module.exports = authModel


const db = require('../../helpers/connection')
const bcrypt = require('bcrypt')
const authModel = {
  login:(email)=>{
    console.log('Email:', email)
    //console.log('Password:', password)
    return new Promise((resolve, reject) => {
      db.query(`SELECT email, password, role FROM users WHERE email=$1`,[email],(err, result)=>{
        if(err){
          reject(err.message)
        }else{
          resolve(result.rows[0])
        }
      })      
    })
}
}

module.exports = authModel