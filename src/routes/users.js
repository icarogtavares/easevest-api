const express = require('express')
const { userController } = require('../controllers/users')

const router = express.Router()

router.route('/')
  .get((req, res, next) => userController.findAll(req, res, next))
  .post((req, res, next) => userController.create(req, res, next))
  .delete((req, res, next) => userController.destroy(req, res, next))

router.route('/query')
  .post((req, res, next) => userController.findWithQuery(req, res, next))

router.route('/:id')
  .get((req, res, next) => userController.findOne(req, res, next))
  .put((req, res, next) => userController.update(req, res, next))

module.exports = router
