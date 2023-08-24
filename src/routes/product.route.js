const express = require('express')
const router = express.Router()
const formUpload = require('../../helpers/formUpload')
const { authentication, authorizationOperator } = require('../../middlewares/auth.middleware')

// import controller
const productController = require('../controllers/product.controller')

// operator
router.get('/', authentication, authorizationOperator, productController.get)
router.get('/:id', authentication, authorizationOperator, productController.getDetail)
router.post('/', authentication, authorizationOperator, formUpload.single('picture'), productController.add)
router.patch('/:id', authentication, authorizationOperator, formUpload.single('picture'), productController.update)
router.delete('/:id', authentication, authorizationOperator, productController.remove)

module.exports = router
