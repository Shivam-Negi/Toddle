const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const { UserService} = require('../services');
const {PostRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {Enums} = require('../utils/common');
const {DISABLE} = Enums.COMMENTS;
const postRepo = new PostRepository();

function validateAuthRequest(req, res, next) {
    if(!req.body.uid) {
        ErrorResponse.message = 'Something went wrong while authenticating user';
        ErrorResponse.error = new AppError(['Uid not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.password) {
        ErrorResponse.message = 'Something went wrong while authenticating user';
        ErrorResponse.error = new AppError(['password not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response) {
            req.user = response; // setting the user id in the req object
            next();
        }
    } catch (error) {
        return res
                .status(error.statusCode)
                .json(error);
    }
}

async function checkCommentPermission(req, res, next) {
    try {
        const post = await postRepo.get(Number(req.body.postId));
        console.log(post);
        if(post.comments === DISABLE) {
            ErrorResponse.message = 'comments has been disabled by the user on this post';
            ErrorResponse.error = new AppError(['comments disabled on this post'], StatusCodes.BAD_REQUEST);
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(ErrorResponse);
        }
        next();
    } catch (error) {
        return res
                .status(error.statusCode)
                .json(error);
    }
}

module.exports = {
    validateAuthRequest,
    checkCommentPermission,
    checkAuth,
}