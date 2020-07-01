export {};
const express = require('express')
const router = express.Router()
const signUpController = require('../controllers/signup.ts')

router.post('/', signUpController.createUser);

module.exports = router;