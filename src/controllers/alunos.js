const alunosService = require('../services/alunos')

const findWithQuery = (req, res, next) => {
  alunosService.findWithQuery(req.body)
    .then(result => res.send(result))
    .catch(err => next(err))
}

const findAll = (req, res, next) => {
  alunosService.findAll()
    .then(result => res.send(result))
    .catch(err => next(err))
}

const findOne = (req, res, next) => {
  alunosService.findOne(req.params.id)
    .then(result => res.send(result))
    .catch(err => next(err))
}

const create = (req, res, next) => {
  alunosService.create(req.body)
    .then(result => res.send(result))
    .catch(err => next(err))
}

const destroy = (req, res, next) => {
  alunosService.destroy(req.body)
    .then(result => res.send(result))
    .catch(err => next(err))
}

module.exports = {
  findWithQuery,
  findAll,
  findOne,
  create,
  destroy,
}
