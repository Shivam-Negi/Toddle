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


module.exports = {
    createPost,
    removePost,
}