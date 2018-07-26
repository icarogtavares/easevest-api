const express = require('express')
const { userController } = require('../controllers/user')

const router = express.Router()

router.route('/login')
  .post((req, res, next) => userController.login(req, res, next))

module.exports = router
