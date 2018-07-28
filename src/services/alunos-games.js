const DocumentService = require('./document')
const { btGamesService } = require('./btgames')

class AlunosGamesService extends DocumentService {
  constructor () {
    super('alunos_games')
  }

  async create ({ doc }) {
    try {
      const btgame = await btGamesService.findOne(doc.gameId)
      if (btgame) return super.create({ doc })
      throw new Error('Jogo não existe no sistema!')
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async getGames (alunoMatricula) {
    try {
      const jogos = await this.findWithQuery({
        aluno_matricula: alunoMatricula,
      })
      if (!jogos) throw new Error('Jogos não encontrados!')
      return Promise.resolve(jogos || [])
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async getGame (alunoMatricula, gameId) {
    try {
      const jogo = await this.findOne(gameId)
      if (!jogo) throw new Error('Jogo não encontrado!')
      if (jogo.aluno_matricula !== alunoMatricula) throw new Error('Jogo não pertence a esse aluno')
      const btgame = await btGamesService.findOne(jogo.gameId)
      jogo.nome = btgame.nome
      return Promise.resolve(jogo || [])
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
