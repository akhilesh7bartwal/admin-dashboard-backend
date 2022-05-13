const express = require('express')
const router = express.Router()
const Controller = require('../controller/Employee')
const cors = require('cors')

router.get('/', Controller.showIndex)
router.post('/signup',Controller.signUp)

module.exports = router