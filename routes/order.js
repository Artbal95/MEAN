const {Router} = require('express')
const orderControllers = require('../controllers/order')
const router = Router()

// localhost:5000/api/order
router.get('/', orderControllers.getAll)

// localhost:5000/api/order
router.post('/', orderControllers.create)

module.exports = router