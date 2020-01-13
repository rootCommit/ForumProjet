const topicModel = require('../model/topicModel');
const postOwnerModel = require('../model/postOwnerModel');
const htmlspecialschars = require('htmlspecialchars');
const userModel = require('../model/userModel');

exports.createTopic = (req, res, next) => {
    //Verifier les caractere spéciaux avec htmlspecialchar surtout avec les posts
    //Creer un post (le poste de l'op)
    //creer le topic puis lui attribuer le post
    console.log(req.userData.userId);
    const postOwner = new postOwnerModel({
        author: req.userData.userId,
        created_at: new Date(),
        message: htmlspecialschars(req.body.message)
    });
    
    postOwner.save().then(pOCreated => {
        console.log(pOCreated.author);
        const topic = new topicModel({
            title: req.body.title,
            author: pOCreated.author,
            post: pOCreated._id,
            created_at: pOCreated.created_at
        });
        topic.save().then((topicCreated => {
            res.status(201).json({
                id: topicCreated._id,
                title: topicCreated.title,
                authorId: topicCreated.author,
                idPostOwner: topicCreated.post,
                message: postOwner.message,
                created_at: topicCreated.created_at,
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


exports.getTopics = (req, res, next) => {

    topicModel.find().then(
        topicsList => {
            let topicListOutPut= [];
            topicsList.forEach(topic => {
                userModel.findById({ _id:topic.author }).then(author => {
                    topicListOutPut.push({
                        topic: topic,
                        op: author
                    });

                    if(topicListOutPut.length == topicsList.length){
                        res.status(201).json({
                            topics: topicListOutPut
                        });  
                    }
                   
                });
            });
           
        }
    ).catch((err) => {
        res.status(401).json(
            {
                message: err
            }
        );
    });

};