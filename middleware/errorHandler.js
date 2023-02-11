const notFound = (req,res,next) => {
    return res.render('404')
}
module.exports = {notFound}
