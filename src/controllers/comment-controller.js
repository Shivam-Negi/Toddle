const { StatusCodes } = require('http-status-codes');

const {CommentService} = require('../services');

const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createComment(req, res) {
    try {
        const comment = await CommentService.createComment({
            userId : req.user,
            postId : Number(req.body.postId),
            content : req.body.content,
        });
        SuccessResponse.data = comment;
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
async function updateComment(req, res) {
    try {
        const comment = await CommentService.updateComment(req.params.id, 
        {
            content : req.body.content,
        });
        SuccessResponse.data = comment;
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
async function deleteComment(req, res) {
    try {
        const comment = await CommentService.deleteComment(req.params.id);
        SuccessResponse.data = comment;
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
    createComment,
    updateComment,
    deleteComment,
}