const express = require('express');

const userController = require('../controller/userController');
let userRoute = express.Router();

/**
 * Go implementer les fonctions dans les controlleurs
 */

userRoute.post('/signUp', userController.signUp);



userRoute.get('/login', userController.signIn);

module.exports = userRoute;