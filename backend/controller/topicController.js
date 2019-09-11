const topicModel = require('../model/topicModel');
const postOwnerModel = require('../model/postOwnerModel');
const htmlspecialschars = require('htmlspecialchars');

exports.createTopic = (req, res, next) => {
    //Verifier les caractere spéciaux avec htmlspecialchar surtout avec les posts
    //Creer un post (le poste de l'op)
    //creer le topic puis lui attribuer le post
    const postOwner = new postOwnerModel({
        author: req.author.id,
        created_at: new Date(),
        message: htmlspecialchars(req.message)
    });
    
    postOwner.save().then(pOCreated => {
        const topic = new topicModel({
            title: req.title,
            author: req.userData.userId,
            post: pOCreated._id,
            created_at: pOCreated.created_at
        });
        topic.save().then((topicCreated => {
            res.status(201).json({
                topic: topic,
                op: pOCreated
            });
        })).catch((err) => {
            res.status(401).json(
                {
                    message: err
                }
            );
        });
       
    })
    .catch( (err) => {
        res.status(401).json({
            message: err
        })
    });


    
};