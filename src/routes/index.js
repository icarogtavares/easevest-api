const express = require('express')
const assistantRoutes = require('./watson-assistant')
const documentRoutes = require('./document')
const alunosRoutes = require('./alunos')

const router = express.Router()

router.use('/message', assistantRoutes)
router.use('/document', documentRoutes)
router.use('/alunos', alunosRoutes)

module.exports = router
