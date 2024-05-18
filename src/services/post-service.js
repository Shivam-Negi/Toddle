const { UserRepository, UserfollowersRepository, PostRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const userRepo = new UserRepository();
const userfollowersRepo = new UserfollowersRepository();
const postRepo = new PostRepository();

async function createPost(data) {
    try {
        const post = await postRepo.create(data);
        return post;
    }
    catch(error) {
        console.log(error)
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            //console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Post object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function removePost(id) {
    try {
        const response = await postRepo.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The post you requested to delete in not available', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the post', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFollowing(userId) {
    try {
        const following = await userRepo.getFollowing(userId);
        const followingIds = following[0].Following.map(user => user.id);
        followingIds.push(userId); // Include the user's own ID
console.log('followings : ', followingIds);
        const posts = await postRepo.getFeed(followingIds);
        const formattedPosts = posts.map(post => ({
            id: post.id,
            content: post.content,
            media: post.media,
            user: {
            id: post.User.id,
            name: post.User.name,
            uid: post.User.uid
            },
            likesCount: post.Likes.length,
            commentsCount: post.Comments.length,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        }));

        return formattedPosts;
    } catch (error) {
        console.log('error in feed : ', error);
        throw new AppError('Cannot load the feed', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createPost,
    removePost,
    getFollowing,

}