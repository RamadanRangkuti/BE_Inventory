const express = require('express')
const router = express.Router()
const {authentication, authorizationOperator} = require ('../../middlewares/auth.middleware')
// const formUpload = require('../../helpers/formUpload')

//import controller
const stockController = require('../controllers/stock.controller')

// router.get('/',userController.get)
router.post('/in',authentication, authorizationOperator, stockController.stockIn)
router.post('/out',authentication, authorizationOperator, stockController.stockOut)
router.post('/edit',authentication, authorizationOperator, stockController.stockEdit)

module.exports = router