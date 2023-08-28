const { urlencoded, json } = require('express')
// const { v4: uuidv4 } = require('uuid')
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./src/routes/index')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
// const db = require('./helpers/connection')

// menerima application/www.form-encoded
app.use(urlencoded({ extended: true }))
// menerima json
app.use(json())
app.use('/api/v1/', router)
// access backend
// app.use(cors())
// app.use(express.static('public'))
// app.use(cors({
//   origin : ['ramadanrangkuti.com']
// }))

// app.get('/products',(req,res)=>{
//   db.query(`SELECT * FROM products`,(err,result)=>{
//     if(err){
//       res.status(500).send({message:err.message})
//     }else{
//       res.status(200).send({message:"succes", data:result.rows})
//     }
//   })
// })

// app.get('/products/:id',(req,res)=>{
//   const {id} = req.params
//   db.query(`SELECT * FROM products WHERE id_product='${id}'`,(err,result)=>{
//     if(err){
//       return res.status(500).send({message:err.message})
//     }else{
//       return res.status(200).send({message:'succes', data:result.rows[0]})
//     }
//   })
// })

// app.post('/products',(req,res)=>{
//   const {id_product, name, price, description, picture, stock} = req.body
//   db.query(`INSERT INTO products(id_product, name, price, description, picture, stock) VALUES ('${uuidv4()}','${name}','${price}','${description}','${picture}','${stock}')`,
//   (err,result)=>{
//     if(err){
//       return res.status(500).send({message:err.message})
//     }else{
//       return res.status(201).send({message:"succes",data:req.body})
//     }
//   })
// })

// app.put('/products/:id', (req,res)=>{
//   const {name, price, description, picture, stock} = req.body
//   const {id} = req.params
//   db.query(`UPDATE products SET name='${name}',price='${price}',description='${description}',picture='${picture}',stock='${stock}' WHERE id_product='${id}'`,
//   (err,result)=>{
//     if(err){
//       return res.status(500).send({message:err.message})
//     }else{
//       return res.status(200).send({message:`succes update data '${id}'`, data : req.body})
//     }
//   })
// })

// app.patch('/products/:id',(req,res)=>{
//   const {name, price, description, picture, stock} = req.body
//   const {id} = req.params
//   //get all berdasarkan id
//   db.query(`SELECT * FROM products WHERE id_product='${id}'`,(err,result)=>{
//     if(err){
//       res.status(500).send({message:err.message})
//     }else{
//       db.query(`UPDATE products SET name='${name||result.rows[0].name}',price='${price||result.rows[0].price}',description='${description||result.rows[0].description}',picture='${picture||result.rows[0].picture}',stock='${stock||result.rows[0].stock}' WHERE id_product='${id}'`,
//       (err,result)=>{
//         if(err){
//           return res.status(500).send({message:err.message})
//         }else{
//           return res.status(200).send({message:`succes update data '${id}'`, data: req.body})
//         }
//       })
//     }
//   })
// })

// app.delete('/products/:id',(req,res)=>{
//   const {id} = req.params
//   db.query(`DELETE FROM products WHERE id_product='${id}'`,(err,result)=>{
//     if(err){
//       res.status(500).send({message:err.message})
//     }else{
//       return res.status(201).send({message:`succes deleted '${id}'`, data:{}})
//     }
//   })
// })

const PORT = process.env.SERVER_PORT || 5000
// console.log(process.env.SERVER_PORT)
app.listen(PORT, () => {
  console.log(`backend successfully running on port ${PORT}`)
})

app.get('*', (req, res) => {
  return res.send({ status: 404, message: 'not found' })
})
