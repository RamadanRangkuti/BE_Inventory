const express = require('express')
const router = express.Router()

// import controller
const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)

module.exports = router
