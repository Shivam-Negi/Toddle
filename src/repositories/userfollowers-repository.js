const CrudRepository = require('./crud-repository');

const { UserFollowers } = require('../models');

class UserfollowersRepository extends CrudRepository {
    constructor() {
        super(UserFollowers);
    }

    async getFollowInfo(data) {
        const response = await UserFollowers.findOne({
            where : {
                followingId : data.followingId,
                followerId : data.followerId
            }
        });
        return response;
    }

    async unfollow(data) {
        const response = await UserFollowers.destroy({
            where : {
                followingId : data.followingId,
                followerId : data.followerId
            }
        });
        return response;
    }
}

module.exports = UserfollowersRepository;