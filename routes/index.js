const express = require('express')
const router = express.Router()
const passport = require('passport')

const authRoute = require('./authRoute')
const adminRoute = require('./adminRoute')

router.use('/', authRoute)

router.use('/admin', adminRoute)
 
module.exports = router