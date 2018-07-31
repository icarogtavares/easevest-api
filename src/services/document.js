const { getDatabase } = require('../bin/cloudant')
const { dissoc, mergeDeepRight, clone } = require('ramda')
/* eslint-disable no-underscore-dangle */
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

  update ({ doc, fields }) {
    let newDoc = clone(doc)
    delete newDoc._rev
    return this.findOne(newDoc._id)
      .then((dbDoc) => {
        newDoc = mergeDeepRight(dbDoc, newDoc)
        return this.create({ doc: newDoc, fields })
      })
  }

  destroy ({ docId, docRev }) {
    return getDatabase(this.dbName).destroy(docId, docRev)
  }

  static removeDocId (doc) {
    return dissoc('_rev', (dissoc('rev', dissoc('_id', dissoc('id', doc)))))
  }
}

module.exports = DocumentService
