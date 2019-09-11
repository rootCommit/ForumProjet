const express = require('express');
const topicRoute = express.Router();
const checkAuth = require('../middleware/checkAuth');

topicRoute.post('/newTopic', checkAuth);

module.exports = topicRoute;