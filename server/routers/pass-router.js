const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/auth-middleware')
const passController = require('../controllers/pass-controller')

router.route('/').get(authenticate,passController.getPasswords)
router.route('/passwords').post(authenticate,passController.postPasswords)
router.route('/passwords/:id').delete(authenticate,passController.deletePassword)
router.route('/passwords/:id').put(authenticate,passController.editPassword)

module.exports = router