const express = require('express')
const router = express.Router()

const {checkAuthenticated} = require('../middleware/auth')

router.get('/main',checkAuthenticated, (req, res) => {
    res.render('main', { username: req.user?.username })
})

router.get('/logout',checkAuthenticated, async (req, res) => {
    req.logout()
    res.redirect('/login')
})

module.exports = router
