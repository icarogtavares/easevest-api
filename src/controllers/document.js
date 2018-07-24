const { initDBConnection } = require('../bin/cloudant')

const read = (req, res, next) => {
  const conn = initDBConnection()
  const db = conn.db.use(req.query.dbName)
  delete req.query.dbName
  return db.find({
    selector: req.query,
  })
    .then(result => res.send(result))
    .catch(err => next(err))
}

const create = (req, res, next) => {
  const {
    dbName,
    doc,
    fields,
  } = req.body
  const conn = initDBConnection()
  const db = conn.db.use(dbName)
  return db.insert(doc, fields)
    .then(result => res.send(result))
    .catch(err => next(err))
}

const destroy = (req, res, next) => {
  const { dbName, docId, docRev } = req.body
  const conn = initDBConnection()
  const db = conn.db.use(dbName)
  return db.destroy(docId, docRev)
    .then(result => res.send(result))
    .catch(err => next(err))
}

module.exports = {
  read,
  create,
  destroy,
}
