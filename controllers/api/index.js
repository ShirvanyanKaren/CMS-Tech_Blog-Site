const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);

router.use('/posts', userRoutes);

router.use('/comments', userRoutes);

module.exports = router;