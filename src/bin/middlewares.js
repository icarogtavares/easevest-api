const bodyParser = require('body-parser')
const helmet = require('helmet')
const express = require('express')

const auth = require('../bin/auth')
const routes = require('../routes/')
const userRoutes = require('../routes/user')

const configureExpress = () => {
  const app = express()

  app.set('port', process.env.PORT || '3000')

  app.use(helmet())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use('/api', userRoutes)
  app.use('/api', auth().authenticate(), routes)

  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res, next) => { // eslint-disable-line max-params, no-unused-vars
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || err.statusCode || 500)
    res.send(res.locals.error)
  })

  return app
}

module.exports = {
  configureExpress,
}
