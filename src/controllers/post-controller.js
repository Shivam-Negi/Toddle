const { StatusCodes } = require('http-status-codes');
const { PostService, UserService } = require('../services');

const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function getPostDetails(req, res) {
    try {
        const info = await PostService.getPostDetails(req.params.id);
        SuccessResponse.data = info;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        //console.log(error)
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function createPost(req, res) {    
    try {
        console.log(req.body);
        // console.log('inside controller')
        const post = await PostService.createPost({
            content : req.body.content,
            media : req.body.media,
            userId : req.user,
            comments : req.body.comments,
            isScheduled : req.body.isScheduled,
            scheduledAt : req.body.scheduledAt,
        });
        SuccessResponse.data = post;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);

    }
    catch(error) {
        console.log(error)
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function removePost(req, res) {
    try {
        const response = await PostService.removePost(req.params.id);
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getFeed(req, res) {
    try {
        const userId = req.user;
        const response = await PostService.getFollowing(userId);
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createPost,
    removePost,
    getFeed,
    getPostDetails,
}