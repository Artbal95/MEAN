const {Router} = require('express')

// initialization Router
const router = Router()

// Get Controllers For Router
const analyticsControllers = require('../controllers/analytics')

// Todo Create Routers For Analytics

// localhost:5000/api/analytics/overview
router.get('/overview', analyticsControllers.overview)

// localhost:5000/api/analytics/analytics
router.get('/analytics', analyticsControllers.analytics)

module.exports = router