const { initDBConnection } = require('../bin/cloudant')

class DocumentService {
  constructor (dbName) {
    this.dbName = dbName
  }

  findWithQuery (selector) {
    const conn = initDBConnection()
    const db = conn.db.use(this.dbName)
    return db.find({ selector })
  }

  findAll () {
    const conn = initDBConnection()
    const db = conn.db.use(this.dbName)
    return db.find({ selector: {} })
  }

  findOne (id) {
    const conn = initDBConnection()
    const db = conn.db.use(this.dbName)
    return db.get(id)
  }

  create ({ doc, fields }) {
    const conn = initDBConnection()
    const db = conn.db.use(this.dbName)
    return db.insert(doc, fields)
  }

  destroy ({ docId, docRev }) {
    const conn = initDBConnection()
    const db = conn.db.use(this.dbName)
    return db.destroy(docId, docRev)
  }
}

module.exports = DocumentService
