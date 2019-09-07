const express = require('express');

const userController = require('../controller/userController');
let userRoute = express.Router();
const authChecker = require('../middleware/checkAuth');

/**
 * Go implementer les fonctions dans les controlleurs
 */

userRoute.post('/signUp', userController.signUp);

userRoute.post('/login', userController.signIn);

userRoute.get('/getUsers', authChecker.checkAuth,userController.getUsers);

module.exports = userRoute;