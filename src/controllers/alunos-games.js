const DocumentController = require('./document')
const { alunosGamesService } = require('../services/alunos-games')

class AlunosGamesController extends DocumentController {
  static alunoNaoPermitidoError (req) {
    if (req.params.alunoId && req.params.alunoId !== req.user._id) { // eslint-disable-line no-underscore-dangle
      return new Error('Aluno não permitido.')
    }
    return null
  }

  async update (req, res, next) {
    const error = AlunosGamesController.alunoNaoPermitidoError(req)
    if (error) return next(error)
    try {
      if (req.body.doc.custos.respondido) {
        req.body.doc.finalizado = true
      }
      const result = await this.service.update(req.params.gameId, req.body)
      return res.send(result)
    } catch (err) {
      return next(err)
    }
  }

  async getGames (req, res, next) {
    const error = AlunosGamesController.alunoNaoPermitidoError(req)
    if (error) return next(error)
    try {
      const result = await this.service.getGames(req.params.alunoId)
      return res.send(result)
    } catch (err) {
      return next(err)
    }
  }

  async getGame (req, res, next) {
    const error = AlunosGamesController.alunoNaoPermitidoError(req)
    if (error) return next(error)
    try {
      const { alunoId, gameId } = req.params
      const result = await this.service.getGame(alunoId, gameId)
      return res.send(result)
    } catch (err) {
      return next(err)
    }
  }

  async getGameStage (req, res, next) {
    const error = AlunosGamesController.alunoNaoPermitidoError(req)
    if (error) return next(error)
    try {
      const { alunoId, gameId, stage } = req.params
      const result = await this.service.getGameStage(alunoId, gameId, stage)
      return res.send(result)
    } catch (err) {
      return next(err)
    }
  }

  async getLastNotAnsweredGameStage (req, res, next) {
    const error = AlunosGamesController.alunoNaoPermitidoError(req)
    if (error) return next(error)
    try {
      const { alunoId, gameId } = req.params
      const result = await this.service.getLastNotAnsweredGameStage(alunoId, gameId) // eslint-disable-line max-len
      return res.send(result)
    } catch (err) {
      return next(err)
    }
  }
}

const alunosGamesController = new AlunosGamesController(alunosGamesService)

module.exports = {
  alunosGamesController,
  AlunosGamesController,
}
