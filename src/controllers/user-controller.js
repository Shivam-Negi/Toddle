const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services');

const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { log } = require('winston');


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


async function getUserByUserId(req, res) {
    try {
        const user = await UserService.getUserByUserId(req.params.id);
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.OK)
                .json(user);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * POST : /signup
 * req-body {uid: 'abc_12', password: '1jkj1'}
 */

async function createUser(req, res) {    // signup
    try {
        // console.log('inside controller')
        const user = await UserService.createUser({
            name : req.body.name,
            uid : req.body.uid,
            password : req.body.password
        });
        SuccessResponse.data = user;
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

async function signin(req, res) {
    try {
        const user = await UserService.signin({
            uid: req.body.uid,
            password: req.body.password
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        console.log(error)
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function followUser(req, res) {
    
    try {
        const response = await UserService.followUser({
            followingId : +req.body.followingId,
            followerId : req.user
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        console.log(error)
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    getUser,
    getUserByUserId,
    createUser,
    signin,
    followUser,
}