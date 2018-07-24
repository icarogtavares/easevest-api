module.exports = {
  security: {
    jwtSecret: process.env.JWT_SECRET || 's3cr3tk3y',
    jwtSession: { session: false },
    salt: process.env.SALT || 's3cr3t_s4lt',
  },
}
