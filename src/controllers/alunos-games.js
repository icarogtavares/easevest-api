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
}

const alunosGamesController = new AlunosGamesController(alunosGamesService)

module.exports = {
  alunosGamesController,
  AlunosGamesController,
}
