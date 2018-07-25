const express = require('express')
const assistantRoutes = require('./watson-assistant')
const alunosRoutes = require('./alunos')

const router = express.Router()

router.use('/message', assistantRoutes)
router.use('/alunos', alunosRoutes)

module.exports = router
