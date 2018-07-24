const express = require('express')
const documentController = require('../controllers/document')

const router = express.Router()

router.route('/')
  .get(documentController.read)
  .post(documentController.create)
  .delete(documentController.destroy)

module.exports = router
