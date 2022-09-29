const express = require('express')
const router = express.Router()

const {checkAuthenticated} = require('../middleware/auth')


router.get('/main',checkAuthenticated, (req, res) => {
    console.log(req);
    res.render('main', { username: req.user?.username })
})

router.get('/logout',checkAuthenticated, (req, res) => {
    req.logOut()
    res.redirect('/login')
})

module.exports = router