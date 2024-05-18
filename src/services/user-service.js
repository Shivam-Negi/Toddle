const { UserRepository, UserfollowersRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const { Auth } = require('../utils/common');
const { warn } = require('winston');
const userRepo = new UserRepository();
const userfollowersRepo = new UserfollowersRepository();

async function getUser(id) {
    try {
        const user = await userRepo.get(id);
        return user;
    } catch (error) {
        //console.log(error)
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The user you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUserByUserId(userId) {
    try {
        const user = await userRepo.getUserByUserId(userId);
        return user;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The user you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function createUser(data) {
    try {
        const user = await userRepo.create(data);
        return user;
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
        throw new AppError('Cannot create a new User object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data) {
    try {
        const user = await userRepo.getUserByUid(data.uid);
        // console.log('in service, User details: ', user);
        if(!user) {
            throw new AppError('No user found for the given email', StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        //console.log("password match : ", passwordMatch);
        if(!passwordMatch) {
            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({id: user.id, email: user.uid});
        return jwt;
    } catch (error) {
        if(error instanceof AppError)   throw error;
        // console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function followUser(data) {
    try {
        const followInfo = await userfollowersRepo.getFollowInfo(data);
        console.log('info : ', followInfo);
        if(followInfo) {
            const response = await userfollowersRepo.unfollow(data);
            console.log('resp : ', response);
            return 'Unfollowed the user.';
        }
        const follow = await userfollowersRepo.create(data);
        return follow;
    } catch (error) {
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token) {
    try {
        if(!token) {
            throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        //console.log("response : ", response);
        const user = await userRepo.get(response.id);
        if(!user) {
            throw new AppError('No user found', StatusCodes.NOT_FOUND);
        }
        return  user.id;
    } catch (error) {
        if(error instanceof AppError)   throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getUser,
    getUserByUserId,
    createUser,
    signin,
    isAuthenticated,
    followUser,
}