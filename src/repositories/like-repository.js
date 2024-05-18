const CrudRepository = require('./crud-repository');

const { Like } = require('../models');

class UserRepository extends CrudRepository {
    constructor() {
        super(Like);
    }

    async getByUidAndPostId(data) {
        const like = await Like.findOne({
            where : {
                userId : data.userId,
                postId : data.postId,
            }
        });
        return like;
    }

    async deleteLike(data) {
        const like = await Like.findOne({
            where : {
                userId : data.userId, 
                postId : data.postId
            }
        });
        if(like) {
            await like.destroy();
        }
        return like;
    }
}

module.exports = UserRepository;