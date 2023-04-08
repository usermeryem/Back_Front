const passport=require('passport')
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

const LocalStrategy = require('passport-http-bearer').Strategy

passport.use(new LocalStrategy(
    async function (token, done) {
        const decoded = jwt.verify(token, process.env.secret_jwt)

        const response = await User.findById(decoded.id)

        if (!response) { return done(null, false); }
        return done(null, response);
    }
))