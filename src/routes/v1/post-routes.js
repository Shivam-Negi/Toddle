const express = require('express');

const { PostController } = require('../../controllers');

const { AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

// router.get('/:id', UserController.getUser);

router.post('/', AuthRequestMiddlewares.checkAuth, 
                        PostController.createPost);

router.delete('/:id', AuthRequestMiddlewares.checkAuth,
                        PostController.removePost);

router.get('/feed', AuthRequestMiddlewares.checkAuth, 
                        PostController.getFeed);

module.exports = router;