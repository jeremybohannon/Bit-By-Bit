const express = require('express')
const router = express.Router()

const user_controller = require('../controllers/user.controller')

router.post('/create', user_controller.create)

router.put('/get', user_controller.read)

router.put('/update', user_controller.update)

router.delete('/:userId/delete', user_controller.delete)

module.exports = router