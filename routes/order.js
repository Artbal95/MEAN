const {Router} = require('express')

// initialization Router
const router = Router()

// Get Controllers For Router
const orderControllers = require('../controllers/order')

// Todo Create Routers For Orders

// localhost:5000/api/order
router.get('/', orderControllers.getAll)

// localhost:5000/api/order
router.post('/', orderControllers.create)

module.exports = router