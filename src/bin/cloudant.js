const getConfig = require('../config/cloudant')
const Cloudant = require('@cloudant/cloudant')
const cloudantDebug = require('debug')('easevest-api:cloudant:')

const config = getConfig()

/**
 * @param {{url: String, iamApiKey: string}} params
 * @returns {Cloudant.ServerScope}
 */
const getCloudant = (params) => {
  const { url, iamApiKey } = params
  return Cloudant({
    url,
    plugins: [
      {
        iamauth: { iamApiKey },
      },
      'promises',
    ],
  })
}

/**
 * @returns {Cloudant.ServerScope}
 */
const initDBConnection = () => {
  const cloudant = getCloudant(config)
  cloudantDebug('Connected to cloudant.')
  return cloudant
}

module.exports = {
  initDBConnection,
}
