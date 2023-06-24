const express = require('express')
const router = express.Router()
const formUpload = require('../../helpers/formUpload')
const {authentication, authorizationOperator} = require ('../../middlewares/auth.middleware')

//import controller
const productController = require('../controllers/product.controller')

//operator
router.get('/', productController.get)
router.get('/:id', productController.getDetail)
router.post('/', formUpload.single('picture'),productController.add)
router.patch('/:id', formUpload.single('picture'),productController.update)
router.delete('/:id', productController.remove)


module.exports = router