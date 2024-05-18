const CrudRepository = require('./crud-repository');

const { Post, User, Like, Comment } = require('../models');

class PostRepository extends CrudRepository {
    constructor() {
        super(Post);
    }

    async getFeed(followingIds) {
        const posts = await Post.findAll({
            where: {
              userId: followingIds
            },
            include: [
              {
                model: User,
                attributes: ['name', 'uid']
              },
              {
                model: Like,
                attributes: ['id']
              },
              {
                model: Comment,
                attributes: ['id']
              }
            ],
            order: [['createdAt', 'DESC']]
          });

          return posts;
    }

    async getDetails(postId) {
        const post = await Post.findOne({
            where: { 
                id: postId 
            },
            include: [
              {
                model: User,
                attributes: ['id', 'name', 'uid'],
              },
              {
                model: Like,
                attributes: ['id'],
              },
              {
                model: Comment,
                attributes: ['id', 'content', 'userId', 'createdAt'],
                include: {
                  model: User,
                  attributes: ['id', 'name'],
                },
              },
            ],
          });

        return post;
    }
}

module.exports = PostRepository;