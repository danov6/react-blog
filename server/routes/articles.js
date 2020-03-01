const mongoose = require('mongoose');
const router = require('express').Router();
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');

//Add article
router.post('/api/articles/add', (req, res, next) => {
    if (!req.user) {
        console.log("[ Add Article ] User is not authorized");
        res.json({
            error: ['Not authorized']
        });
    } else {
        //Save article to user
        User.findOne({
            '_id': req.user._id
        }).exec().then((usr) => {
            if(usr){
                let { body } = req;
                body['author_id'] = usr._id;
                body['author_name'] = usr.username;

                const newArticle = new Article(body);
                usr['articles'].push(newArticle);
                usr.save((err, u) => {
                    if (err) return console.error("[ Add Article ] " + err);
                    console.log("[ Add Article ] Article saved to user: " + usr._id);
                    console.log(newArticle);

                    //Save article to collection
                    newArticle.save((err, a) => {
                        if (err) return console.error("[ Add Article ] " + err);
                        console.log(`[ Add Article ] Article ${a.title} saved to collection by: ` + a.author_id);
                        res.json({
                            article: newArticle.toJSON(),
                        });
                    });
                });
            }else{
                console.log("[ Add Article ] No user found with ID: " + req.user._id);
            }
        });
    }
});

router.get('/articles', (req, res, next) => {
    Article.find()
    .sort({
        createdAt: 'descending'
    })
    .then((articles) => {
        console.log('[ Get Articles ] Get all articles');
        res.json({
            articles: articles.map(article => article.toJSON())
        });
    })
    .catch(next);
});

router.param('id', (req, res, next, id) => {
    Article.findById(id, (err, article) => {
        if (err) {
            return res.sendStatus(404);
        } else if (article) {
            req.article = article;
            return next();
        }
    }).catch(next);
});

router.get('/articles/:id', (req, res, next) => {
    res.json({
        article: req.article.toJSON(),
    });
});

router.patch('/api/articles/:id', (req, res, next) => {
    if (!req.user) {
        console.log("[ Update Article ] User is not authorized");
        res.json({
            error: ['Not authorized']
        });
    } else {
        const { body } = req;

        Object.keys(body).forEach(function(prop){
            req.article[prop] = body[prop];
        });
    
        req.article.save()
        .then((a) => {
            console.log("[ Update Article ] Article updated: " + a._id);
            res.json({
                article: req.article.toJSON()
            });
        })
        .catch(next);
    }
});

//Delete article NEEDS WORK
router.post('/api/articles/remove', (req, res, next) => {
    if (!req.user) {
        console.log("[ Delete Article ] User is not authorized");
        res.json({
            error: ['Not authorized']
        });
    } else {
        let articleId = req.body._id;
        Article.findByIdAndRemove(articleId)
        .then(() => {
            console.log(`[ Delete Article ] Article ${articleId} removed from collection`);
            //Save article to user
            User.findOne({
                '_id': req.user._id
            }).exec().then((usr) => {
                if(usr){
                    usr['articles'].pull(req.body._id);
                    usr.save((err,u) => {
                        if(err){
                            res.json({
                                error: [err]
                            });
                        }else{
                            res.json({
                                user: u
                            });
                        }
                    });
                }else{
                    res.json({
                        error: ['User not found']
                    });
                }
            })
        });
    }
});

//Delete all articles
router.post('/api/articles', (req, res, next) => {
    if (!req.user) {
        res.json({error: ['Not authorized']});
    } else {
        User.findOne({
            '_id': req.user._id
        }).exec().then((usr) => {
            if(usr){
                usr['Articles'] = [];
                usr.save((err, u) => {
                    if (err) res.json({error: [err]});
                    Article.deleteMany({
                        author: req.user._id
                    },function(err){
                        if (err){
                            res.json({error: ['No user found']});
                        }
                        res.json({
                            user: usr
                        });
                    });
                });
            }else{
                console.log("[ Delete All Articles ] No user found with ID: " + req.user._id);
                res.json({error: ['No user found']});
            }
        });
    }
});

router.post('/api/articles/vote', (req, res, next) => {
    if (!req.user) {
        console.log("[ Upvote Article ] User is not authorized");
        res.json({
            error: ['Not authorized']
        });
    } else {
        User.findOne({
            '_id': req.user._id
        }).exec().then((usr) => {
            if(usr){
                Article.findOne({
                    '_id': req.body._id
                }).exec().then((art) => {
                    if(art){
                        if(art['upvotes'].indexOf(req.user._id) != -1){
                            art['upvotes'].pull(req.user._id);
                        }else{
                            art['upvotes'].push(req.user._id);
                        }
                        art.save((err,a) => {
                            res.json({
                                article: a
                            });
                        });
                    }else{
                        res.json({
                            error: ['Article not found. Refresh the page']
                        });
                    }
                });
            }else{
                res.json({
                    error: ['User not logged in']
                });
            }
        });
    }
});

router.post('/api/comments/add', (req, res, next) => {
    if (!req.user) {
        console.log("[ Comment Article ] User is not authorized");
        res.json({
            error: ['Not authorized']
        });
    } else {
        User.findOne({
            '_id': req.user._id
        }).exec().then((usr) => {
            if(usr){
                Article.findOne({
                    '_id': req.body._id
                }).exec().then((art) => {
                    if(art){
                        //create new comment
                        let newComment = new Comment();
                        newComment['author'] = usr;
                        newComment['article'] = art;
                        newComment['body'] = req.body.body

                        art['comments'].push(newComment);

                        //add comment to article
                        art.save((err,a) => {
                            //add comment to collection
                            console.log(a);
                            newComment.save((err,c) => {
                                console.log(c);
                                res.json({
                                    comments: art.toJSON().comments,
                                    // comments: a.comments
                                });
                            });
                        });
                    }else{
                        res.json({
                            error: ['Article not found. Refresh the page']
                        });
                    }
                });
            }else{
                res.json({
                    error: ['User not logged in']
                });
            }
        });
    }
});

module.exports = router;