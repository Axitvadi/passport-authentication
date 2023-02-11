const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/userSchema')

const {checkNotAuthenticated} = require('../middleware/auth')

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('index')
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    const error = req.flash('error')
    const success = req.flash('success')
    res.render('login',{error,success})
})
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    // successRedirect: '/admin/main',
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {
    console.log(req.hostname);
    res.redirect('/admin/main')
})

router.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup')
})
router.post('/signup', checkNotAuthenticated, async (req, res) => {
    try {
        const created = await User.create(req.body)
        if (!created) {
            res.redirect('/signup')
        }
        res.redirect('/login')
    } catch (err) {
        res.json({Message: err})
    }
})

module.exports = router
