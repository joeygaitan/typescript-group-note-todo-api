export {};
const router = require('express').Router()
const userController = require('../../controllers/user/user')
const authMiddleWare = require("../../controllers/login")

//test for models
const userModels = require('../../models/user/user')

// get personal data but not the password
router.get('/', authMiddleWare.isAuthenticated, userController.getPersonalData)

// getting list of users userModels
router.get('/search/:username', authMiddleWare.isAuthenticated, userController.userSearch)

// get another users id
router.get('/:id', authMiddleWare.isAuthenticated, userController.getUser)

// update personal account
router.put('/update',authMiddleWare.isAuthenticated, userController.updateAccount)

// change password
router.put('/', authMiddleWare.isAuthenticated, userController.changePassword)

// change secrets
router.put('/secrets', authMiddleWare.isAuthenticated, userModels.changeSecrets)



 

module.exports = router;