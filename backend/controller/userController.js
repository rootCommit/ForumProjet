
const UserModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

exports.signUp = (req, res, next) => {

    UserModel.findOne({ username: req.body.username }).then(
        user => {
            if(user){
                console.log(user);
                return res.status(201).json(
                    {message: "pseudo existant"}
                );
            }
            
            else{
                UserModel.findOne({email: req.body.email}).then(user => {
                    if(user){
                        console.log(user);
                        return res.status(201).json(
                            {message: "email existant"}
                        );
                    }else {
                        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                            console.log(hashedPassword);
                            const user = new UserModel({
                                username: req.body.username,
                                password: hashedPassword,
                                email: req.body.email,
                                dateCreation: new Date()
                            });
                            user.save().then((result) => {
                                const token = jwt.sign(
                                    {
                                        email: result.email,
                                        username: result.username,
                                        id: result._id
                                    },
                                    'secret', { expiresIn: '1h' }
                                );
                                return res.status(201).json({
                                    message: 'User created',
                                    expiresIn: 3600,
                                    token: token,
                                    username: result.username,
                                    email: result.email,
                                    id: result._id
                                });
                            });
                        });
                    }
                })
                
            } 
        }).catch(error => {
            res.status(500).json({
                err: error
            });
        })
    
}
    



exports.signIn = (req, res , next) => {
    let fetchedUser;
    console.log(req.body.username);
    console.log(req.body.password);
    UserModel.findOne({ username: req.body.username })
    .then((user) => {
        if(!user){
            return res.status(401).json({
                message: "utilisateur non existant"
            });
        }
        //check password
        fetchedUser = user;
        return bcrypt.compare(req.body.password, fetchedUser.password);
    })
    .then(compare => {
        console.log(compare);
        if(!compare){
            return res.status(401).json(
                {
                    message: "bad password"
                }
            );
        }
        const token = jwt.sign(
            {
                id: fetchedUser._id,
                email: fetchedUser.email,
                username: fetchedUser.username
            },
            'secret', { expiresIn: '1h' }
        );
        return res.status(201).json({
            message: 'authenticated',
            expiresIn: 3600,
            id_user: fetchedUser._id,
            email: fetchedUser.email,
            username: fetchedUser.username,
            token: token
            });
    })
    .catch(err => {
        return res.status(401).json({
          message: "Authentification échouée",
          error: err
        });
      });
}

exports.getUsers = (req, res, next) => {
    let userList = [];
    UserModel.find().sort({ dateCreation: -1 }).
    then(result =>{
        userList = result;
        return res.status(201).json(
            userList
        );
    })
    .catch(error => {
        return res.status(401).json({
            message: "request failed",
            error: error
        });
    });
    
}

