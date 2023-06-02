const express = require('express')
const { controllerWrapper } = require('../../middlewares')
const { shops: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAllShops))

module.exports = router
