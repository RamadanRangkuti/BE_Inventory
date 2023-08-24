/* eslint-disable camelcase */
const db = require('../../helpers/connection')

const stockModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query('select * from stock left join products on stock.product_id = products.id_product left join users on stock.user_id = users.id_user', (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result.rows)
        }
      })
    })
  },
  insert: ({ id_stock, dates, product_id, type, user_id, note, qty }) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO stock(id_stock, dates, product_id, type, user_id, note, qty) VALUES ($1,$2,$3,$4,$5,$6,$7)', [id_stock, dates, product_id, type, user_id, note, qty],
        (err, result) => {
          if (err) {
            reject(err.message)
          } else {
            resolve({ dates, product_id, type, user_id, note, qty })
          }
        })
    })
  }
}

module.exports = stockModel
