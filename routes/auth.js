const express = require('express')
const router = express.Router()
const Controller = require('../controller/Employee')
const cors = require('cors')

const verify = require('./authVerify')

router.get('/', Controller.showIndex)
router.post('/signup', cors(), Controller.signUp)
router.post('/signin', cors(), Controller.signin)
router.get('/getemployees', verify, Controller.getEmployees)

module.exports = router