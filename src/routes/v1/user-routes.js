const express = require('express');

const { UserController } = require('../../controllers');

const { AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

router.get('/:id', UserController.getUser);

router.get('/userId/:id', UserController.getUserByUserId);

router.post('/signup', AuthRequestMiddlewares.validateAuthRequest,
                        UserController.createUser);

router.post('/signin', AuthRequestMiddlewares.validateAuthRequest,
                        UserController.signin);

router.post('/follow', AuthRequestMiddlewares.checkAuth, 
                        UserController.followUser);

module.exports = router;