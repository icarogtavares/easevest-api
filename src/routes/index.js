const express = require('express')
// const assistantRoutes = require('./watson-assistant')
const userRoutes = require('./users')
const alunoRoutes = require('./alunos')
const adminRoutes = require('./admin')
const alunosGamesRoutes = require('./alunos-games')
const btGamesRoutes = require('./btgames')

const router = express.Router()

// router.use('/message', assistantRoutes)
router.use('/users', userRoutes)
router.use('/alunos', alunoRoutes)
router.use('/admins', adminRoutes)
router.use('/alunos', alunosGamesRoutes)
router.use('/btgames', btGamesRoutes)

module.exports = router
