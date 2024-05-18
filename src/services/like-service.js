const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const {LikeRepository} = require('../repositories');


const likeRepo = new LikeRepository();

async function createLike(data) {
    try {
        const likeCheck = await likeRepo.getByUidAndPostId(data);
        console.log(likeCheck);
        if(likeCheck) {
            await likeRepo.deleteLike(data);
            return 'Unliked the post successfully';
        }
        const like = await likeRepo.create(data);
        return like;
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
        throw new AppError('Cannot like this post', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createLike,
}

