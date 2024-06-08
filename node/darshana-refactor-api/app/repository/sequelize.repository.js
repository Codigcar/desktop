const BaseRepository = require('./base.repository')

class SequelizeDataRepository extends BaseRepository {
  constructor(model) {
    super(model)
  }
}

module.exports = SequelizeDataRepository
