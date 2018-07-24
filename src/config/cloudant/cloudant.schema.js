const Joi = require('joi')

const objSchema = {
  CLOUDANT_URL: Joi.string().disallow(['<cloudant_url>']).required(),
  CLOUDANT_IAM_API_KEY: Joi.string().required(),
}

const schema = Joi.object(objSchema).unknown().required()

module.exports = schema
