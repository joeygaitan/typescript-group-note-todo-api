const router = require('express').Router()
const loginController = require('../controllers/login')

// checks if you have access
router
.get('/token',loginController.isAuthenticated, loginController.getAuthStatus)

// gives you token
router
.post('/', loginController.login)

module.exports = router;