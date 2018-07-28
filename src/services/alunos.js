// const { initDBConnection } = require('../bin/cloudant')
const UserService = require('./user')

class AlunoService extends UserService {
  constructor () {
    super('alunos')
    this.isAdmin = false
  }
}

const alunoService = new AlunoService()

module.exports = {
  alunoService,
  AlunoService,
}
