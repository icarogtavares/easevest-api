const DocumentController = require('./document')
const { alunoService } = require('../services/alunos')

class AlunoController extends DocumentController {
  async getGames (req, res, next) {
    try {
      const result = await this.service.getGames(req.params.id)
      res.send(result)
    } catch (err) {
      next(err)
    }
  }
}

const alunoController = new AlunoController(alunoService)

module.exports = {
  AlunoController,
  alunoController,
}
