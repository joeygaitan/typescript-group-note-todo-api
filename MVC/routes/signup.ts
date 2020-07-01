export {};
const express = require('express')
const router = express.Router()
const signUpController = require('../controllers/signup.js')

router.post('/', signUpController.createUser);

module.exports = router;