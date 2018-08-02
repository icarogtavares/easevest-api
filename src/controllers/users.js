const { userService } = require('../services/users')
const { compareSync } = require('bcrypt')
const DocumentController = require('./document')
const jwt = require('jsonwebtoken')
const cfg = require('../config/config')

class UserController extends DocumentController {
  async update (req, res, next) {
    try {
      const result = await this.service.update(req.params.id, req.body)
      return res.send(result)
    } catch (err) {
      return next(err)
    }
  }

  findAllAlunos (req, res, next) {
    return this.service.findAllAlunos(req.body)
      .then(result => res.send(result))
      .catch(err => next(err))
  }

  findAllAdmins (req, res, next) {
    return this.service.findAllAdmins(req.body)
      .then(result => res.send(result))
      .catch(err => next(err))
  }

  async login (req, res, next) {
    try {
      return await this.verifyUserAndLogin(req, res, next)
    } catch (alunoErr) {
      return next(alunoErr)
    }
  }

  async verifyUserAndLogin (req, res, next) {
    try {
      const { user, token } = await this.checkUserAndGenerateToken(req)
      const result = await this.service.updateToken(user, token)
      if (!result.ok) throw new Error('Não foi possível atualizar token de acesso!')
      return res.send({ token, role: user.role })
    } catch (err) {
      return next(err)
    }
  }

  generateToken (matricula, role) { // eslint-disable-line class-methods-use-this
    const payload = { matricula, role }
    return jwt.sign(payload, cfg.security.jwtSecret, { expiresIn: '7d' })
  }

  async checkUserAndGenerateToken (req) {
    const result = await this.service.findWithQuery({
      selector: {
        matricula: req.body.matricula,
      },
    })
    let user = null
    if (result && result.docs && result.docs[0]) {
      [user] = result.docs
    }
    if (!user) throw new Error('Usuário é vazio ou nulo!')
    if (!compareSync(req.body.senha, user.senha)) throw new Error(`Senha inválida! Role:{${user.role}}`)
    const token = this.generateToken(user.matricula, user.role)
    return { user, token }
  }
}

const userController = new UserController(userService)

module.exports = {
  UserController,
  userController,
}
