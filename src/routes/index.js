const express = require('express')
const router = express.Router()
const { authentication, authorizationOperator } = require('../../middlewares/auth.middleware')

// const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const productRoute = require('./product.route')
const stockRoute = require('./stock.route')
const authRoute = require('./auth.route')

router.get('/', (req, res) => {
  return res.send('BACKEND FOR INVENTORY MANAGEMENT')
})

router.use('/auth', authRoute)
router.use('/products', authentication, authorizationOperator, productRoute)
router.use('/users', userRoute)
router.use('/stock', stockRoute)
// router.use('/auth', authRoute)

module.exports = router
