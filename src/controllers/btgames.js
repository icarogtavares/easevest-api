const DocumentController = require('./document')
const { btGamesService } = require('../services/btgames')

class BTGameController extends DocumentController {
}

const btGameController = new BTGameController(btGamesService)

module.exports = {
  BTGameController,
  btGameController,
}
