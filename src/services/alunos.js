// const { initDBConnection } = require('../bin/cloudant')
const UserService = require('./user')

class AlunoService extends UserService {
  constructor () {
    super('alunos')
    this.isAdmin = false
  }

  async getGames (id) {
    try {
      const aluno = await this.findOne(id)
      if (!aluno) throw new Error('Aluno não encontrado!')
      return Promise.resolve(aluno.games || {})
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

const alunoService = new AlunoService()

module.exports = {
  alunoService,
  AlunoService,
}
