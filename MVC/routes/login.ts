const router = require('express').Router()
const loginController = require('../controllers/login')

// checks if you're still logged in constantly with token
router
.get('/token',loginController.isAuthenticated, loginController.getAuthStatus)

// gives you token
router
.post('/', loginController.login)

module.exports = router;