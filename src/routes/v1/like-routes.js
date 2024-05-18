const express = require('express');

const {LikeController} = require('../../controllers');

const { AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', AuthRequestMiddlewares.checkAuth, LikeController.createLike);

module.exports = router;