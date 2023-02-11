const express = require('express')
const router = express.Router()

const {checkAuthenticated} = require('../middleware/auth')

router.get('/main',checkAuthenticated, (req, res) => {
    const cookie = req.cookies
    console.log(cookie)
    const view = cookie.views ? + cookie.views + 1 : 1

    res.cookie(`views`,view,{
        maxAge: 500000, // in mili second
        // expires works the same as the maxAge
        // expires: new Date('12 1 2022'),
        secure: true,  // if true browser only accept cookie from https connection,  on localhost it false 
        httpOnly: true, // only access by http not in browser
        // sameSite: 'none' // default lax, lax mean for browser matches the domain of cookie, strict means for This will restrict cross-site sharing even between different domains that the same publisher owns
    });
    res.render('main', { username: req.user?.username })
})

router.get('/logout',checkAuthenticated, async (req, res) => {
    req.logout()
    res.redirect('/login')
})

router.get('/set-cookies',checkAuthenticated, async (req,res) => {

})

module.exports = router
