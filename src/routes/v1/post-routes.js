const express = require('express');

const { PostController } = require('../../controllers');

const { AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();


router.post('/', AuthRequestMiddlewares.checkAuth, 
                    PostController.createPost);

router.delete('/:id', AuthRequestMiddlewares.checkAuth,
                        PostController.removePost);

router.get('/feed', AuthRequestMiddlewares.checkAuth, 
                    PostController.getFeed);

router.get('/:id', AuthRequestMiddlewares.checkAuth, 
                PostController.getPostDetails);

module.exports = router;