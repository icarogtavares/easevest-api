class DocumentController {
  constructor (service) {
    this.service = service
  }

  findWithQuery (req, res, next) {
    this.service.findWithQuery(req.body)
      .then(result => res.send(result))
      .catch(err => next(err))
  }

  findAll (req, res, next) {
    this.service.findAll()
      .then(result => res.send(result))
      .catch(err => next(err))
  }

  findOne (req, res, next) {
    this.service.findOne(req.params.id)
      .then(result => res.send(result))
      .catch(err => next(err))
  }

  create (req, res, next) {
    this.service.create(req.body)
      .then(result => res.send(result))
      .catch(err => next(err))
  }

  update (req, res, next) {
    this.service.update(req.body)
      .then(result => res.send(result))
      .catch(err => next(err))
  }

  destroy (req, res, next) {
    this.service.destroy(req.body)
      .then(result => res.send(result))
      .catch(err => next(err))
  }
}

module.exports = DocumentController
