const express = require('express')
const { btGameController } = require('../controllers/btgames')

const router = express.Router()

router.route('/')
  .get((req, res, next) => btGameController.findAll(req, res, next))
  .post((req, res, next) => btGameController.create(req, res, next))
  .delete((req, res, next) => btGameController.destroy(req, res, next))

router.route('/:id')
  .get((req, res, next) => btGameController.findOne(req, res, next))

router.route('/query')
  .post((req, res, next) => btGameController.findWithQuery(req, res, next))

module.exports = router
