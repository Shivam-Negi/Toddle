const CrudRepository = require('./crud-repository');

const { Comment } = require('../models');
class UserRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }

    async updateComment(data) {
        const comment = await Comment.update(
            {content : data.content},
            {where : {
                userId : data.userId,
                postId : data.postId,
            }}
        );
        if(comment === 0) {
            return null;
        }
        const updatedComment = await Comment.findOne({
            where : {
                userId : data.userId, 
                postId : data.postId
            }
        });
        return updatedComment;
    }

    async deleteComment(data) {
        const comment = await Comment.findOne({
            where : {
                userId : data.userId, 
                postId : data.postId
            }
        });
        console.log(comment);
        if(comment) {
            await comment.destroy();
        }
        return comment;
    }
}

module.exports = UserRepository;