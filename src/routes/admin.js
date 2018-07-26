const express = require('express')
const { adminController } = require('../controllers/admin')

const router = express.Router()

router.route('/')
  .get((req, res, next) => adminController.findAll(req, res, next))
  .post((req, res, next) => adminController.create(req, res, next))
  .delete((req, res, next) => adminController.destroy(req, res, next))

router.route('/:id')
  .get((req, res, next) => adminController.findOne(req, res, next))

router.route('/query')
  .post((req, res, next) => adminController.findWithQuery(req, res, next))

module.exports = router
