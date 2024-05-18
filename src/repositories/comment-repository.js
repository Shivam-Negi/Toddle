const CrudRepository = require('./crud-repository');

const { Comment } = require('../models');
class UserRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }
    async destroyComment(id) {
        const comment = await Comment.findOne({
            id : id
        });
        if(comment) {
            await comment.destroy();
        }
        return comment;
    }
}

module.exports = UserRepository;