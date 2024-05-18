const express = require('express')

const router = express.Router()

const { InfoController } = require('../../controllers');
const userRoutes = require('./user-routes');
const likeRoutes = require('./like-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.get('/info', InfoController.info);
router.use('/user', userRoutes);
router.use('/like', likeRoutes);
router.use('/comment', commentRoutes);
router.use('/post', postRoutes);

module.exports = router;