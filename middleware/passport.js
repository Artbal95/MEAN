const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Configs
const keys = require('../config/keys')

// MongoDB Models
const User = require('../models/User')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    // Get Passport Method Use
    passport.use(
        // Create Strategy With Options and Callback
        new JwtStrategy(options, async (payload, done) => {
            try {
                // Find Current User By Id And Check
                const user = await User.findById(payload.userId)
                    .select('email id')

                if (user) {
                    // If All Okay
                    done(null, user)
                } else {
                    // If No Any User
                    done(null, false)
                }
            } catch (e) {
                // If Error
                console.log(e);
            }

        })
    )
}