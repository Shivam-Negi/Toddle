const express = require('express');

const {CommentController} = require('../../controllers');

const { AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', AuthRequestMiddlewares.checkAuth, AuthRequestMiddlewares.checkCommentPermission, CommentController.createComment);

router.patch('/:id', AuthRequestMiddlewares.checkAuth, CommentController.updateComment);

router.delete('/:id', AuthRequestMiddlewares.checkAuth, CommentController.deleteComment);



module.exports = router;