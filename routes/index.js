const express = require('express');
const router = express.Router();
const userRoutes = require('./user-routes.js');
const blogRoutes = require('./blog-routes.js');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);

module.exports = router;