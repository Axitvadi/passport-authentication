function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/admin/main')
    }
    return next()
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/login')
}

 module.exports = {checkNotAuthenticated,checkAuthenticated}