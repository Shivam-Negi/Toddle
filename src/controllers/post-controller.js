const { StatusCodes } = require('http-status-codes');
const { PostService } = require('../services');

const { SuccessResponse, ErrorResponse } = require('../utils/common');


/**
 * POST : /user/:id 
 * req-body {}
 */
async function getUser(req, res) {
    try {
        const user = await UserService.getUser(req.params.id);
        SuccessResponse.data = user;
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

module.exports = {
    createPost,
    removePost,
}