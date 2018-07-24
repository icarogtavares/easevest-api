const { initDBConnection } = require('../bin/cloudant')
/* eslint-disable no-underscore-dangle, consistent-return */

function sanitizeInput (str) {
  return String(str).replace(/&(?!amp;|lt;|gt;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function createResponseData ({ email, name, phone }) {
  return {
    _id: sanitizeInput(email),
    name: sanitizeInput(name),
    phone: sanitizeInput(phone),
    created_at: new Date(),
  }
}

function insertUserIntoDatabase (user, callback) {
  const db = initDBConnection()
  db.insert(user, callback)
}

// function getUserFromDatabase (id, callback) {
//   const db = initDBConnection()
//   db.get(id, callback)
// }

const get = (req, res, next) => {
  const db = initDBConnection()
  db.get({ _id: sanitizeInput(req.body.email) }, (err, doc) => {
    if (err) {
      next(err)
    } else {
      res.send(doc)
    }
  })
}

const post = (req, res, next) => {
  const user = createResponseData(req.body)
  if (!user._id || !user.name) {
    return next(new Error('Campos e-mail ou nome em branco.'))
  }

  insertUserIntoDatabase(user, (err) => {
    if (err && err.statusCode !== 409) return next(err)
    return res.render('save-user-localstorage.html', {
      user,
      isNewUser: !(err && err.statusCode === 409),
      absoluteUrl: req.absoluteUrl,
    })
  })
}

module.exports = {
  get,
  post,
}
