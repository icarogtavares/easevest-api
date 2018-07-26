const DocumentService = require('./document')
const { genSaltSync, hashSync } = require('bcrypt')

class UserService extends DocumentService {
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
