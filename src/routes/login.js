const express = require('express')
const { userController } = require('../controllers/users')
const auth = require('../bin/auth')

const router = express.Router()

router.route('/login')
  .get(auth().authenticate(), (req, res, next) => res.send('Auth test OK!')) // eslint-disable-line no-unused-vars
  .post((req, res, next) => userController.login(req, res, next))

module.exports = router
