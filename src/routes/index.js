const express = require('express')
const assistantRoutes = require('./watson-assistant')
const cloudantRoutes = require('./cloudant')
const documentRoutes = require('./document')

const router = express.Router()

router.use('/message', assistantRoutes)
router.use('/cloudant', cloudantRoutes)
router.use('/document', documentRoutes)

module.exports = router
