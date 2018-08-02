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
const { userService } = require('../services/users')

const params = {
  secretOrKey: cfg.security.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
}

const isNotNil = complement(isNil)

module.exports = () => {
  const authUser = async (done, payload) => {
    const result = await userService.findWithQuery({
      selector: {
        matricula: payload.matricula,
      },
    })
    let user = null
    if (result && result.docs && result.docs[0]) {
      [user] = result.docs
    }
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
      return authUser(done, payload)
    } catch (err) {
      return done(err, null)
    }
  })

  passport.use(strategy)

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', cfg.security.jwtSession),
  }
}
