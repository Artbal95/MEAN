const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')

// initialization App
const app = express()


// MongoDb Connect Config
const keys = require('./config/keys')
mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))

// Passport Connect Config
app.use(passport.initialize())
require('./middleware/passport')(passport)

// Routers
const authRouter = require('./routes/auth')
const analyticsRouter = require('./routes/analytics')
const categoryRouter = require('./routes/category')
const orderRouter = require('./routes/order')
const positionRouter = require('./routes/position')

// Static Files For Client
app.use('/uploads', express.static('uploads'))

// App Config
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

// App Routes Listen
app.use('/api/auth', authRouter)
app.use('/api/analytics', passport.authenticate('jwt', {session: false}), analyticsRouter)
app.use('/api/category', passport.authenticate('jwt', {session: false}), categoryRouter)
app.use('/api/order', passport.authenticate('jwt', {session: false}), orderRouter)
app.use('/api/position', passport.authenticate('jwt', {session: false}), positionRouter)

module.exports = app