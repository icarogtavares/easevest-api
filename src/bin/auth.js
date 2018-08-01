const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const {
  __,
  eqProps,
  isNil,
  complement,
} = require('ramda')
const jwt = require('jsonwebtoken')
const cfg = require('../config/config')
const { adminService } = require('../services/admin')
const { alunoService } = require('../services/alunos')

const params = {
  secretOrKey: cfg.security.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
}

const isNotNil = complement(isNil)

module.exports = () => {
  const authUser = async (done, payload, service) => {
    const user = await service.findOne(payload.matricula)
    if (!user) return done(null, false)
    const userToken = jwt.decode(user.access_token)
    const tokenAndPayloadEqProps = eqProps(__, userToken, payload)
    if (isNotNil(userToken) && tokenAndPayloadEqProps('role') && tokenAndPayloadEqProps('matricula') && tokenAndPayloadEqProps('iat') && tokenAndPayloadEqProps('exp')) {
      return done(null, user)
    }
    return done(null, false)
  }

  const strategy = new Strategy(params, async (payload, done) => {
    try {
      return await authUser(done, payload, adminService)
    } catch (err) {
      if (err._response && err._response.statusCode === 404) { // eslint-disable-line no-underscore-dangle
        return authUser(done, payload, alunoService)
      }
      return done(err, null)
    }
  })

  passport.use(strategy)

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', cfg.security.jwtSession),
  }
}
