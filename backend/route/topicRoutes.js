const express = require('express');
const topicRoute = express.Router();
const checkAuth = require('../middleware/checkAuth');
const topicController = require('../controller/topicController');

topicRoute.post('/newTopic', checkAuth.checkAuth, topicController.createTopic);
topicRoute.get('/getTopics', topicController.getTopics);

module.exports = topicRoute;
