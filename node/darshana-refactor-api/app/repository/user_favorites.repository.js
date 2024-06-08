const BaseRepository = require('./base.repository')

class UserFavoritesRepository extends BaseRepository {
  constructor(model) {
    super(model)
  }
}

module.exports = UserFavoritesRepository
