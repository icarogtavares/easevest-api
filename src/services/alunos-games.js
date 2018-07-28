const DocumentService = require('./document')

class AlunosGamesService extends DocumentService {
  constructor () {
    super('alunos_games')
  }

  async getGames (id) {
    try {
      const jogos = await this.findWithQuery({
        aluno_matricula: id,
      })
      if (!jogos) throw new Error('Jogos não encontrados!')
      return Promise.resolve(jogos || [])
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

const alunosGamesService = new AlunosGamesService()

module.exports = {
  alunosGamesService,
  AlunosGamesService,
}
