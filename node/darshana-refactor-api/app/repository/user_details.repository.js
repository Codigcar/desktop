const BaseRepository = require('./base.repository')

class UserDetailsRepository extends BaseRepository {
  constructor(model) {
    super(model)
  }
}

module.exports = UserDetailsRepository
