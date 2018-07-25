const { initDBConnection } = require('../bin/cloudant')

const findWithQuery = (selector) => {
  const conn = initDBConnection()
  const db = conn.db.use('alunos')
  return db.find({ selector })
}

const findAll = () => {
  const conn = initDBConnection()
  const db = conn.db.use('alunos')
  return db.find({ selector: {} })
}

const findOne = (id) => {
  const conn = initDBConnection()
  const db = conn.db.use('alunos')
  return db.get(id)
}

const create = ({ doc, fields }) => {
  const conn = initDBConnection()
  const db = conn.db.use('alunos')
  return db.insert(doc, fields)
}

const destroy = ({ docId, docRev }) => {
  const conn = initDBConnection()
  const db = conn.db.use('alunos')
  return db.destroy(docId, docRev)
}

module.exports = {
  findWithQuery,
  findAll,
  findOne,
  create,
  destroy,
}
