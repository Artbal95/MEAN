const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Configs, Errors
const keys = require('../config/keys')
const HttpErrorHandler = require('../utils/errorHandler')

// MongoDB Models
const User = require('../models/User')

module.exports.login = async (req, res) => {

    try {

        // Get Body, Email and Password
        const {email, password} = req.body

        // Check Is There Any Candidate
        const candidate = await User.findOne({email})

        if (candidate) {
            // Check If Yes, Check The Password
            const passResult = bcrypt.compareSync(password, candidate.password)

            if (passResult) {

                // If Password Right, Create Token
                const token = jwt.sign(
                    {
                        email: candidate.email,
                        userId: candidate._id
                    },
                    keys.jwt,
                    {expiresIn: 60 * 60})

                res.status(200).json({token})

            } else {

                // If Password Wrong, Return Some Error Password
                res.status(401).json({
                    message: 'Password Is Wrong. Please Try Again.'
                })

            }

        } else {

            // Check If No Candidate, Return Some Error Email
            res.status(404).json({
                message: 'Candidate with this email was not found'
            })

        }

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }

}

module.exports.register = async (req, res) => {

    try {

        // Get Body, Email and Password
        const {email, password} = req.body

        // Check Is There Any Candidate
        const candidate = await User.findOne({email})

        if (candidate) {

            // Check If Yes, return Error Already Exist
            res.status(409).json({
                message: 'This Email Is Already Exist'
            })

        } else {

            // Check If No, Create New User with Hash Password
            const salt = bcrypt.genSaltSync(10)
            const passHash = bcrypt.hashSync(password, salt)

            // Create New User
            const user = await new User({
                email,
                password: passHash
            }).save()

            res.status(201).json(user)

        }

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }

}