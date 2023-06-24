const db = require('../../helpers/connection')
const {v4: uuidv4} = require('uuid')

const productModel={
  //-filtering
  get:(req,res)=>{
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products`, (err,result)=>{
        if(err){
          reject(err.message)
        }else{
          resolve(result.rows)
        }
      })
    })
  },
  getDetail:({id})=>{
    return new Promise((resolve, reject) => {
      //prepare statement
      db.query(`SELECT * FROM products WHERE id_product=$1`,[id],(err,result)=>{
        if(err){
          reject(err.message)
        }else{
          resolve(result.rows[0])
        }
      })
    })
  },
  add:({id_product,names, price, description, picture, stock})=>{
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO products(id_product, names, price, description, picture, stock) VALUES ($1, $2, $3, $4, $5, $6)`,[id_product, names, price, description, picture, stock],
      (err,result)=>{
        if(err){
         reject(err.message)
        }else{
         resolve({id_product, names, price, description, picture, stock})
        }
      })
    })
  },
  update:({id,names, price, description, picture, stock})=>{
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id_product=$1`,[id],
      (err,result)=>{
        if(err){
          reject(err.message)
        }else{
          db.query(`UPDATE products SET names=$1,price=$2, description=$3, picture=$4, stock=$ WHERE id_product=$6`,
          [names||result.rows[0].names, price||result.rows[0].price, description||result.rows[0].description, picture||result.rows[0].picture, stock||result.rows[0].stock, id],
          (err,result)=>{
            if(err){
              reject({message:err.message})
            }else{
              resolve({id,names, price, description, picture, stock})
            }
          })
        }
      })
    })
  },
  stockIn:({id_product, stock})=>{
    return new Promise((resolve, reject) => {
      db.query(`UPDATE products SET stock=$1 WHERE id_product=$2`,[stock, id_product],(err, result)=>{
        if(err){
          reject (err.message)
        }else{
          resolve({id_product, stock})
        }
      })
    })
  },
  stockOut:({id_product, stock})=>{
    return new Promise((resolve, reject) => {
      db.query(`UPDATE products SET stock=$1 WHERE id_product=$2`, [stock, id_product],(err, result)=>{
        if(err){
          reject (err.message)
        }else{
          resolve({id_product, stock})
        }
      })
    })
  },
  stockEdit:({id_product, stock})=>{
    return new Promise((resolve, reject) => {
      db.query(`UPDATE products SET stock=$1 WHERE id_product=$2`, [stock, id_product],(err, result)=>{
        if(err){
          reject (err.message)
        }else{
          resolve({id_product, stock})
        }
      })
    })
  },
  remove:({id})=>{
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM products WHERE id_product=$1`,[id],(err,result)=>{
        if(err){
          reject(err.message)
        }else{
          resolve(`succes deleted data id : ${id}`)
        }
      })
    })
  }
}

module.exports = productModel