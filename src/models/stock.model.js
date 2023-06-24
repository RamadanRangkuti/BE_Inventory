const db = require('../../helpers/connection')

const stockModel={
  insert:({id_stock, dates, product_id, type, user_id, note, qty})=>{
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO stock(id_stock, dates, product_id, type, user_id, note, qty) VALUES ($1,$2,$3,$4,$5,$6,$7)`,[id_stock, dates, product_id, type, user_id, note, qty],
      (err,result)=>{
        if(err){
          reject(err.message)
        }else{ 
          resolve({dates, product_id, type, user_id, note, qty})
        }
      })
    })
  },
}

module.exports = stockModel