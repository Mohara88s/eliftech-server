const express = require('express')
const { controllerWrapper } = require('../../middlewares')
const { orders: ctrl } = require('../../controllers')

const router = express.Router()

router.patch('/', controllerWrapper(ctrl.addOrder))

router.get('/', controllerWrapper(ctrl.getAllOrdersByQuery))

router.get('/:orderId', controllerWrapper(ctrl.getOrderById))

module.exports = router
