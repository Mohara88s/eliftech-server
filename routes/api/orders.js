const express = require('express')
const { controllerWrapper } = require('../../middlewares')
const { orders: ctrl } = require('../../controllers')

const router = express.Router()

router.patch('/', controllerWrapper(ctrl.addOrder))

module.exports = router
