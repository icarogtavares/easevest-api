const { getDatabase } = require('../bin/cloudant')
const { dissoc, mergeDeepRight, clone } = require('ramda')
/* eslint-disable no-underscore-dangle */
class DocumentService {
  constructor (dbName) {
    this.db = getDatabase(dbName)
  }

  findWithQuery (query) {
    return this.db.find(query)
  }

  findAll () {
    return this.db.find({ selector: {} })
  }

  findOne (id) {
    return this.db.get(id)
  }

  create ({ doc, fields }) {
    return this.db.insert(doc, fields)
  }

  update (id, { doc, fields }) {
    let newDoc = clone(doc)
    newDoc._id = id
    delete newDoc._rev
    return this.findOne(id)
      .then((dbDoc) => {
        newDoc = mergeDeepRight(dbDoc, newDoc)
        return this.create({ doc: newDoc, fields })
      })
  }

  destroy ({ docId, docRev }) {
    return this.db.destroy(docId, docRev)
  }

  static removeDocId (doc) {
    return dissoc('_rev', (dissoc('rev', dissoc('_id', dissoc('id', doc)))))
  }
}

module.exports = DocumentService
