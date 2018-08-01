const { userService } = require('../services/users')
const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const cfg = require('../config/config')

class UserController {
  constructor (userService) { // eslint-disable-line no-shadow
    this.userService = userService
  }

  findAllAlunos (req, res, next) {
    return this.userService.findAllAlunos(req.body)
      .then(result => res.send(result))
      .catch(err => next(err))
  }

  findAllAdmins (req, res, next) {
    return this.userService.findAllAdmins(req.body)
      .then(result => res.send(result))
      .catch(err => next(err))
  }

  async login (req, res, next) {
    try {
      return await this.verifyUserAndLogin(req, res)
    } catch (alunoErr) {
      return next(alunoErr)
    }
  }

  async verifyUserAndLogin (req, res) {
    const { user, token } = await this.checkUserAndGenerateToken(req)
    const result = await this.userService.updateToken(user, token)
    if (!result.ok) throw new Error('Não foi possível atualizar token de acesso!')
    return res.send({ token, role: user.role })
  }

  generateToken (matricula, role) { // eslint-disable-line class-methods-use-this
    const payload = { matricula, role }
    return jwt.sign(payload, cfg.security.jwtSecret, { expiresIn: '7d' })
  }

  async checkUserAndGenerateToken (req) {
    const user = await this.userService.findOne(req.body.matricula)
    if (!user) throw new Error(`Usuário é vazio ou nulo! {${user.role}}`)
    if (!compareSync(req.body.senha, user.senha)) throw new Error(`Senha inválida! Rol:{${user.role}}`)
    const token = this.generateToken(user.matricula, user.role)
    return { user, token }
  }
}

const userController = new UserController(userService)

module.exports = {
  UserController,
  userController,
}
