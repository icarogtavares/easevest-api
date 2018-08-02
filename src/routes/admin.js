const express = require('express')
const { userController } = require('../controllers/users')

const router = express.Router()

router.route('/')
  .get((req, res, next) => userController.findAllAdmins(req, res, next))

router.route('/:id')
  .get((req, res, next) => userController.findOne(req, res, next))

module.exports = router
