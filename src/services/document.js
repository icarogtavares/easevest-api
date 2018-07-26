const { getDatabase } = require('../bin/cloudant')

class DocumentService {
  constructor (dbName) {
    this.dbName = dbName
  }

  findWithQuery (selector) {
    return getDatabase(this.dbName).find({ selector })
  }

  findAll () {
    return getDatabase(this.dbName).find({ selector: {} })
  }

  findOne (id) {
    return getDatabase(this.dbName).get(id)
  }

  create ({ doc, fields }) {
    return getDatabase(this.dbName).insert(doc, fields)
  }

  destroy ({ docId, docRev }) {
    return getDatabase(this.dbName).destroy(docId, docRev)
  }
}

module.exports = DocumentService
