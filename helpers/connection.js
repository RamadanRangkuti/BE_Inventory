const { Client } = require('pg')
require('dotenv').config({ path: '../.env' })

// Des
// const { USER, HOST, DATABASE, PORT } = process.env
// const db = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT
// })
const db = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
})
db.connect((err) => {
  if (err) {
    console.log('db connection error', err)
  }
})

module.exports = db
