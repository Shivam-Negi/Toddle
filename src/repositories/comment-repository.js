const CrudRepository = require('./crud-repository');

const { Comment } = require('../models');
class UserRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }
}

module.exports = UserRepository;