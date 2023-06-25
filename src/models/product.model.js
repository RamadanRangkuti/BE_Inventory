const db = require('../../helpers/connection')
const {v4: uuidv4} = require('uuid')

const productModel={
  get:(query)=>{
    return new Promise((resolve, reject) => {
      const { search, sortField, sortBy, page, limit } = query;
      let queryString = 'SELECT * FROM products';
      if (search) {
        queryString += ` WHERE names ILIKE '%${search}%'`;
      }
      if (sortField && sortBy) {
        queryString += ` ORDER BY ${sortField} ${sortBy}`;
      }
      if (page && limit) {
        //const offset = (page - 1) * limit;
        //offset itu skip. misal mau nampailkan 5 data dari data ke 3 sampai 7 artinya kita skip(offset) 2 data. data 1 dan ke 2
        queryString += ` LIMIT ${limit} OFFSET ${page * limit - limit}`;
      }
      db.query(queryString, (err,result)=>{
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