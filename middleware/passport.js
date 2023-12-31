const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT
}

module.exports = passport => {
    passport.use(
        
        new JwtStrategy(options, async (payload, done) => {
        const user = await User.findById(payload.userId).select('email id') 
            try {
                if (user){

                    done(null, user)                    
                } else {
                    done(null, false)
                }    
            } catch (e) {
            console.log(e) 
            }       
        })
    )
}    
    