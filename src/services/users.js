const DocumentService = require('./document')
const { genSaltSync, hashSync } = require('bcrypt')

class UserService extends DocumentService {
  constructor () {
    super('users')
  }

  create ({ doc, fields }) {
    if (doc && ((doc.senha && doc.changePassword) || !doc._rev)) { // eslint-disable-line no-underscore-dangle
      const salt = genSaltSync()
      doc.senha = hashSync(doc.senha, salt) // eslint-disable-line no-param-reassign
      delete doc.changePassword // eslint-disable-line no-param-reassign
    }
    return super.create({ doc, fields })
  }

  update (id, { doc, fields }) {
    if (doc && doc.senha) { // eslint-disable-line no-underscore-dangle
      const salt = genSaltSync()
      doc.senha = hashSync(doc.senha, salt) // eslint-disable-line no-param-reassign
    }
    return super.update(id, { doc, fields })
  }

  updateToken (user, access_token) { // eslint-disable-line camelcase
    user.access_token = access_token // eslint-disable-line no-param-reassign, camelcase
    return this.create({ doc: user })
  }

  findAllAlunos () {
    return this.findWithQuery({
      selector: {
        role: 'user',
      },
      fields: [
        '_id',
        'matricula',
        'nome',
      ],
    })
  }

  findAllAdmins () {
    return this.findWithQuery({
      selector: {
        role: 'admin',
      },
      fields: [
        '_id',
        'matricula',
        'nome',
      ],
    })
  }
}

const userService = new UserService()

module.exports = {
  UserService,
  userService,
}
