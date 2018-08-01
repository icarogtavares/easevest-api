// const { userService } = require('../services/user')
const { adminService } = require('../services/admin')
const { alunoService } = require('../services/alunos')
const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const cfg = require('../config/config')

class UserController {
  constructor (adminService, alunoService) { // eslint-disable-line no-shadow
    this.adminService = adminService
    this.alunoService = alunoService
  }

  async login (req, res, next) {
    // try {
    //   return await this.verifyUserAndLogin(req, res, this.adminService)
    // } catch (err) {
    // if (err._response && err._response.statusCode === 404) { // eslint-disable-line no-underscore-dangle
    try {
      return await this.verifyUserAndLogin(req, res, this.alunoService)
    } catch (alunoErr) {
      return next(alunoErr)
    }
    // }
    // return next(err)
    // }
  }

  async verifyUserAndLogin (req, res, service) {
    const { user, token } = await this.checkUserAndGenerateToken(req, service)
    const result = await service.updateToken(user, token)
    if (!result.ok) throw new Error('Não foi possível atualizar token de acesso!')
    return res.send({ token, role: user.role })
  }

  generateToken (matricula, role) { // eslint-disable-line class-methods-use-this
    const payload = { matricula, role }
    return jwt.sign(payload, cfg.security.jwtSecret, { expiresIn: '7d' })
  }

  async checkUserAndGenerateToken (req, service) {
    const user = await service.findOne(req.body.matricula)
    if (!user) throw new Error(`Usuário é vazio ou nulo! {${user.role}}`)
    if (!compareSync(req.body.senha, user.senha)) throw new Error(`Senha inválida! Rol:{${user.role}}`)
    const token = this.generateToken(user.matricula, user.role)
    return { user, token }
  }
}

const userController = new UserController(adminService, alunoService)

module.exports = {
  UserController,
  userController,
}
