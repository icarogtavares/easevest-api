const DocumentController = require('./document')
const { alunoService }  = require('../services/alunos')

class AlunoController extends DocumentController {

}

const alunoController = new AlunoController(alunoService)

module.exports = {
  AlunoController,
  alunoController,
}
