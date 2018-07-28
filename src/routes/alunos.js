const express = require('express')
const { alunoController } = require('../controllers/alunos')

const router = express.Router()

router.route('/')
  .get((req, res, next) => alunoController.findAll(req, res, next))
  .post((req, res, next) => alunoController.create(req, res, next))
  .delete((req, res, next) => alunoController.destroy(req, res, next))

router.route('/:id')
  .get((req, res, next) => alunoController.findOne(req, res, next))

router.route('/query')
  .post((req, res, next) => alunoController.findWithQuery(req, res, next))

module.exports = router
