const express = require('express')
const router = express.Router()
const formUpload = require('../../helpers/formUpload')
const { authentication, authorizationAdmin } = require('../../middlewares/auth.middleware')

// import controller
const userController = require('../controllers/user.controller')

// admin
router.get('/', authentication, authorizationAdmin, userController.get)
router.get('/:id', authentication, authorizationAdmin, userController.getDetail)
router.post('/', formUpload.single('picture'), userController.add)
router.patch('/:id', authentication, authorizationAdmin, formUpload.single('picture'), userController.update)
router.delete('/:id', authentication, authorizationAdmin, userController.remove)

module.exports = router
