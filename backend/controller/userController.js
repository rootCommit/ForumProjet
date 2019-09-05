
const UserModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

exports.signUp = (req, res, next) => {
    console.log(req.body.password);
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        console.log(hashedPassword);
        const user = new UserModel({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });
        user.save().then((result) => {
            const token = jwt.sign(
                {
                    email: result.email,
                    username: result.username,
                    
                },
                'secret', { expiresIn: '1h' }
            );
            return res.status(201).json({
                message: 'User created',
                expiresIn: 3600,
                token: token,
                result: result
            });

        }).catch(error => {
           return res.status(500).json({
                message: "error"
            }
            );
        });
    });
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
                username: fetchedUser.username,
                
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

