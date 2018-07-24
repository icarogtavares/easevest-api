const express = require('express')
const cloudantController = require('../controllers/cloudant')

const router = express.Router()

router.route('/')
  .get(cloudantController.get)
  .post(cloudantController.post)

module.exports = router
