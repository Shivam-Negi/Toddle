const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const {CommentRepository} = require('../repositories');


const commentRepo = new CommentRepository();

async function createComment(data) {
    try {
        const comment = await commentRepo.create(data);
        return comment;
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
        throw new AppError('Unable to comment on this post', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateComment(id, data) {
    try {
        const comment = await commentRepo.update(id, data);
        if(comment === 0) {
            return null;
        }
        console.log(id);
        const updatedComment = await commentRepo.get(id);
        return updatedComment;
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
        throw new AppError('Unable to update the comment on this post', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function deleteComment(data) {
    try {
        const comment = await commentRepo.destroyComment(data);
        return comment;
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
        throw new AppError('Unable to delete the comment right now try again later', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createComment,
    updateComment,
    deleteComment,
}

