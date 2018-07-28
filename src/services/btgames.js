const DocumentService = require('./document')

class BTGamesService extends DocumentService {
  constructor () {
    super('btgames')
  }
}

const btGamesService = new BTGamesService()

module.exports = {
  btGamesService,
  BTGamesService,
}
