const express = require('express');
const topicRoute = express.Router();
const checkAuth = require('../middleware/checkAuth');
const topicController = require('../controller/topicController');

topicRoute.post('/newTopic', checkAuth, topicController.createTopic);

module.exports = topicRoute;
