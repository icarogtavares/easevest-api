const express = require('express')
const { userController } = require('../controllers/users')

const router = express.Router()

router.route('/')
  .get((req, res, next) => userController.findAllAlunos(req, res, next))

module.exports = router
