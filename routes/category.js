const {Router} = require('express')
const passport = require('passport')

// initialization Router
const router = Router()

// Config
const upload = require('../middleware/upload')

// Get Controllers For Router
const categoryControllers = require('../controllers/category')

// Todo Create Routers For Category

// localhost:5000/api/category
router.get('/', categoryControllers.getAll)

// localhost:5000/api/category/:id
router.get('/:id', categoryControllers.getById)

// localhost:5000/api/category/:id
router.delete('/:id', categoryControllers.remove)

// localhost:5000/api/category
router.post('/', upload.single('image'), categoryControllers.create)

// localhost:5000/api/category/:id
router.patch('/:id', upload.single('image'), categoryControllers.update)

module.exports = router