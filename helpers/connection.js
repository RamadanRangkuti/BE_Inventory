const { Client } = require('pg')
require('dotenv').config({ path: '../.env' })

// Des
// const { USER, HOST, DATABASE, PORT } = process.env
const db = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT
})
db.connect((err) => {
  if (err) {
    console.log('db connection error', err)
  }
})

module.exports = db
