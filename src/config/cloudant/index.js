const { getConfig } = require('../')
const schema = require('./cloudant.schema')
const Joi = require('joi')

const { error, value: envVars } = Joi.validate(process.env, schema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = getConfig({
  production: {
    url: envVars.CLOUDANT_URL,
    iamApiKey: envVars.CLOUDANT_IAM_API_KEY,
  },
  development: {
    url: envVars.CLOUDANT_URL,
    iamApiKey: envVars.CLOUDANT_IAM_API_KEY,
  },
})

module.exports = config
