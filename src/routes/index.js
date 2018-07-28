const express = require('express')
const assistantRoutes = require('./watson-assistant')
const alunosRoutes = require('./alunos')
const alunosGamesRoutes = require('./alunos-games')
const adminsRoutes = require('./admin')
const userRoutes = require('./user')

const router = express.Router()

router.use('/message', assistantRoutes)
router.use('/alunos', alunosRoutes)
router.use('/alunos', alunosGamesRoutes)
router.use('/admins', adminsRoutes)
router.use('/', userRoutes)

module.exports = router
