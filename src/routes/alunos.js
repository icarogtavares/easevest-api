const express = require('express')
const alunosController = require('../controllers/alunos')

const router = express.Router()

router.route('/')
  .get(alunosController.findAll)
  .post(alunosController.create)
  .delete(alunosController.destroy)

router.route('/:id')
  .get(alunosController.findOne)

router.route('/query')
  .post(alunosController.findWithQuery)

module.exports = router
