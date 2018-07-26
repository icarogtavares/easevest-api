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

  login (req, res, next) {
    this.adminService.findOne(req.body.matricula)
      .then((admin) => {
        const token = this.checkUserAndGenerateToken(admin, req, this.adminService)
        return this.adminService.updateToken(admin, token)
          .then((result) => {
            if (!result.ok) throw new Error(`Não foi possível atualizar token de acesso! Admin:{${this.adminService.isAdmin}}`)
            return res.send({ token })
          })
      })
      .catch((err) => {
        if (err._response && err._response.statusCode === 404) { // eslint-disable-line no-underscore-dangle
          return this.alunoService.findOne(req.body.matricula)
        }
        return next(err)
      })
      .then((aluno) => {
        const token = this.checkUserAndGenerateToken(aluno, req, this.alunoService)
        return this.alunoService.updateToken(aluno, token)
          .then((result) => {
            if (!result.ok) throw new Error(`Não foi possível atualizar token de acesso! Admin:{${this.alunoService.isAdmin}}`)
            res.send({ token })
          })
      })
      .catch(err => next(err))
  }

  generateToken (matricula, isAdmin) { // eslint-disable-line class-methods-use-this
    const payload = { matricula, isAdmin }
    return jwt.sign(payload, cfg.security.jwtSecret, { expiresIn: '7d' })
  }

  checkUserAndGenerateToken (user, req, service) {
    if (!user) throw new Error(`Usuário é vazio ou nulo! {${service.isAdmin}}`)
    if (!compareSync(req.body.senha, user.senha)) throw new Error(`Senha inválida! Admin:{${service.isAdmin}}`)
    return this.generateToken(user.matricula, service.isAdmin)
  }
}

const userController = new UserController(adminService, alunoService)

module.exports = {
  UserController,
  userController,
}
