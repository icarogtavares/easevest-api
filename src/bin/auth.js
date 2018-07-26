const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const {
  _,
  eqProps,
  isNil,
  complement,
} = require('ramda')
const jwt = require('jsonwebtoken')
const cfg = require('../config/config')
const { initDBConnection } = require('../bin/cloudant')
const { userService } = require('../services/user')

const params = {
  secretOrKey: cfg.security.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
}

const isNotNil = complement(isNil)

module.exports = () => {
  const strategy = new Strategy(params, (payload, done) => {
    userService.findUser(payload.matricula)
      .then((user) => {
        if (!user) return done(null, false)
        const userToken = jwt.decode(user.access_token)
        const tokenAndPayloadEqProps = eqProps(_, userToken, payload)
        if (isNotNil(userToken) && tokenAndPayloadEqProps('id') && tokenAndPayloadEqProps('iat') && tokenAndPayloadEqProps('exp')) {
          return done(null, user)
        }
        return done(null, false)
      }).catch(err => done(err, null))
  })

  passport.use(strategy)

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', cfg.security.jwtSession),
  }
}
