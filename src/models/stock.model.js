const db = require('../../helpers/connection')
const { v4: uuidv4 } = require('uuid'); 

const stockModel={
  insert:({id_stock, dates, product_id, type, user_id, note})=>{
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO stock(id_stock, dates, product_id, type, user_id, note) VALUES ($1,$2,$3,$4,$5,$6)`,[id_stock, dates, product_id, type, user_id, note],
      (err,result)=>{
        if(err){
          reject(err.message)
        }else{ 
          resolve({dates, product_id, type, user_id, note})
        }
      })
    })
  },
}

module.exports = stockModel