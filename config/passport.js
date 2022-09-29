
const LocalStrategy = require("passport-local").Strategy;
const USER = require('../models/userSchema')

module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        if (user) {
            return done(null, user._id)
        }
        return done(null, false)
    })
    passport.deserializeUser((_id, done) => {
        USER.findById(_id, (err, user) => {
            if (err) return done(null, false)
            delete user._doc.password
            return done(null, user)
        })
    })

    passport.use(new LocalStrategy(
        async function (username, password, done) {
            console.log(username, password)
            USER.findOne({ username: username }, function (err, user) {
                console.log(user)
                if (err) { return done(err); }
                if (!user) { return done(null, false), { Message: "incorrect username." } }
                if (user.password !== password) { return done(null, false), { Message: "incorrect password" } }
                return done(null, user);
            });
        }
    ));
}