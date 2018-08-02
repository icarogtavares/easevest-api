const express = require('express')
const { alunosGamesController } = require('../controllers/alunos-games')

const router = express.Router()

router.route('/games/query')
  .post((req, res, next) => alunosGamesController.findWithQuery(req, res, next))

router.route('/:alunoId/games')
  .get((req, res, next) => alunosGamesController.getGames(req, res, next))
  .post((req, res, next) => alunosGamesController.create(req, res, next))

router.route('/:alunoId/games/:gameId')
  .get((req, res, next) => alunosGamesController.getGame(req, res, next))
  .put((req, res, next) => alunosGamesController.update(req, res, next))

router.route('/:alunoId/games/:gameId/stage/')
  .get((req, res, next) => alunosGamesController.getLastNotAnsweredGameStage(req, res, next)) // eslint-disable-line

router.route('/:alunoId/games/:gameId/stage/:stage')
  .get((req, res, next) => alunosGamesController.getGameStage(req, res, next))

module.exports = router
