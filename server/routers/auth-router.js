const express = require('express')
const authController = require('../controllers/auth-controller')
const router = express.Router();
const authenticate = require('../middlewares/auth-middleware')
router.route('/register').post(authController.register)
router.route('/login').post(authController.login)

router.route('/user').get(authenticate,authController.user)

module.exports= router