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
    async getFollowing(userId) {
        const following = await User.findAll({
            include: {
              model: User,
              as: 'Following',
              attributes: ['id'],
              through: { attributes: [] }
            },
            where: { id: userId }
          });

        return following;
    }
}

module.exports = UserRepository;