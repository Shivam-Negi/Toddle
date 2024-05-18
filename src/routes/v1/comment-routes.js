const express = require('express');

const {CommentController} = require('../../controllers');

const { AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', AuthRequestMiddlewares.checkAuth, CommentController.createComment);

router.patch('/', AuthRequestMiddlewares.checkAuth, CommentController.updateComment);

router.delete('/', AuthRequestMiddlewares.checkAuth, CommentController.deleteComment);



module.exports = router;