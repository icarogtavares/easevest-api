const express = require('express')
const DocumentController = require('../controllers/alunos')
const DocumentService = require('../services/document')

const router = express.Router()

const documentController = new DocumentController(new DocumentService('alunos'))

router.route('/')
  .get((req, res, next) => documentController.findAll(req, res, next))
  .post((req, res, next) => documentController.create(req, res, next))
  .delete((req, res, next) => documentController.destroy(req, res, next))

router.route('/:id')
  .get((req, res, next) => documentController.findOne(req, res, next))

router.route('/query')
  .post((req, res, next) => documentController.findWithQuery(req, res, next))

module.exports = router
