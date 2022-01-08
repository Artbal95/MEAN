const {Router} = require('express')
const analyticsControllers = require('../controllers/analytics')
const router = Router()

// localhost:5000/api/analytics/overview
router.get('/overview', analyticsControllers.overview)

// localhost:5000/api/analytics/analytics
router.get('/analytics', analyticsControllers.analytics)

module.exports = router