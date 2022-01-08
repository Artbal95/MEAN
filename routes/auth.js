const {Router} = require('express')
const authControllers = require('../controllers/auth')
const router = Router()

// localhost:5000/api/auth/login
router.post('/login', authControllers.login)

// localhost:5000/api/auth/register
router.post('/register', authControllers.register)

module.exports = router