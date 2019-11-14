const express = require('express')
const router = express.Router()

const byte_controller = require('../controllers/byte.controller')

router.post('/create', byte_controller.create)

router.get('/:id', byte_controller.read)

router.put('/:id/update', byte_controller.update)

router.delete('/:id/delete', byte_controller.delete)

module.exports = router