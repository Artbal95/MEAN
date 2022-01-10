const {Router} = require('express')

// initialization Router
const router = Router()

// Get Controllers For Router
const authControllers = require('../controllers/auth')

// Todo Create Routers For Auth

// localhost:5000/api/auth/login
router.post('/login', authControllers.login)

// localhost:5000/api/auth/register
router.post('/register', authControllers.register)

module.exports = router