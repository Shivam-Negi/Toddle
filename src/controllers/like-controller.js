const { StatusCodes } = require('http-status-codes');

const {LikeService} = require('../services');

const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createLike(req, res) {
    try {
        const like = await LikeService.createLike({
            userId : req.user,
            postId : Number(req.body.postId),
        });
        SuccessResponse.data = like;
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
    createLike,
}