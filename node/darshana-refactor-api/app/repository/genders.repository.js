const BaseRepository = require('./base.repository')

class GenderRepository extends BaseRepository {
  constructor(model) {
    super(model)
  }
}

module.exports = GenderRepository
