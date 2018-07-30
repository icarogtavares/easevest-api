const express = require('express')
const { alunosGamesController } = require('../controllers/alunos-games')

const router = express.Router()

router.route('/:id/games')
  .get((req, res, next) => alunosGamesController.getGames(req, res, next))
  .post((req, res, next) => alunosGamesController.create(req, res, next))

router.route('/:alunoId/games/:gameId')
  .get((req, res, next) => alunosGamesController.getGame(req, res, next))

router.route('/:alunoId/games/:gameId/:stage')
  .get((req, res, next) => alunosGamesController.getGameStage(req, res, next))

module.exports = router