const {Router} = require('express')
const positionControllers = require('../controllers/position')
const router = Router()

// localhost:5000/api/position/:categoryId
router.get('/:categoryId', positionControllers.getByCategoryId)

// localhost:5000/api/position
router.post('/', positionControllers.create)

// localhost:5000/api/position/:id
router.patch('/:id', positionControllers.update)

// localhost:5000/api/position/:id
router.delete('/:id', positionControllers.remove)

module.exports = router