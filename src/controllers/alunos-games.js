const DocumentController = require('./document')
const { alunosGamesService } = require('../services/alunos-games')

class AlunosGamesController extends DocumentController {
  async getGames (req, res, next) {
    try {
      const result = await this.service.getGames(req.params.id)
      res.send(result)
    } catch (err) {
      next(err)
    }
  }

  async getGame (req, res, next) {
    try {
      const { alunoId, gameId } = req.params
      const result = await this.service.getGame(alunoId, gameId)
      res.send(result)
    } catch (err) {
      next(err)
    }
  }

  async getGameStage (req, res, next) {
    try {
      const { alunoId, gameId, stage } = req.params
      const result = await this.service.getGameStage(alunoId, gameId, stage)
      res.send(result)
    } catch (err) {
      next(err)
    }
  }

  async getLastNotAnsweredGameStage (req, res, next) {
    try {
      const { alunoId, gameId } = req.params
      const result = await this.service.getLastNotAnsweredGameStage(alunoId, gameId)
      res.send(result)
    } catch (err) {
      next(err)
    }
  }
}

const alunosGamesController = new AlunosGamesController(alunosGamesService)

module.exports = {
  alunosGamesController,
  AlunosGamesController,
}
