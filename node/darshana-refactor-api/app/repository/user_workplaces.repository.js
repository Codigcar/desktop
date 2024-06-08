const BaseRepository = require('./base.repository')

class UserWorkplaceRepository extends BaseRepository {
  constructor(model) {
    super(model)
  }
}

module.exports = UserWorkplaceRepository
