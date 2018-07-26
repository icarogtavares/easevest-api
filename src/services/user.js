// const { alunoService } = require('./alunos')
// const { adminService } = require('./admin')
const DocumentService = require('./document')
const { genSaltSync, hashSync } = require('bcrypt')

class UserService extends DocumentService {
  // findUser (matricula) {
  //   return adminService.findOne(matricula)
  //     .catch(err => alunoService.findOne(matricula))
  // }

  // updateToken (user, access_token) { // eslint-disable-line camelcase
  //   user.access_token = access_token // eslint-disable-line no-param-reassign camelcase
  //   if(user.isAdmin) {
  //     return adminService.create({ doc: user, access_token })
  //   } else {
  //     return alunoService.create({ doc: user, access_token })
  //   }
  // }

  create ({ doc, fields }) {
    if (doc && ((doc.senha && doc.changePassword) || !doc._rev)) { // eslint-disable-line no-underscore-dangle
      const salt = genSaltSync()
      doc.senha = hashSync(doc.senha, salt) // eslint-disable-line no-param-reassign
      delete doc.changePassword // eslint-disable-line no-param-reassign
    }
    return super.create({ doc, fields })
  }

  updateToken (user, access_token) { // eslint-disable-line camelcase
    user.access_token = access_token // eslint-disable-line no-param-reassign, camelcase
    return this.create({ doc: user })
  }
}

module.exports = UserService
