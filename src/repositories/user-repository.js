const CrudRepository = require('./crud-repository');

const { User } = require('../models');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getUserByUid(uid) {
        const user = await User.findOne({
            where : {
                uid : uid
            }
        });
        return user;
    }
    async getUserByUserId(uid) {
        const user = await User.findOne({
            where : {
                uid : uid
            },
            attributes : {exclude : ['password', 'createdAt', 'updatedAt']}
        });
        return user;
    }
}

module.exports = UserRepository;