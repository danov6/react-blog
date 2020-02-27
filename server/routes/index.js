const mongoose = require('mongoose');
const router = require('express').Router();
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const jwt = require('jsonwebtoken');
const email_validator = require("email-validator");

//Env variable
const secret = "SUPER-SECRET-MF-PASSWORD";

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

//Create User
router.post('/signup', (req, res, next) => {
    if (req.body.email && email_validator.validate(req.body.email)) {
        User.findOne({
            'email': req.body.email
        }).exec().then(function(usr) {
            //Check if email was found
            if (usr) {
                console.log("[ Signup ] Email is already registered, please log in: " + req.body.email);
                res.json({
                    error: [req.body.email + ' is already registered, please log in instead']
                });
            } else {
                User.findOne({
                    'username': req.body.username
                }).exec().then((usr) => {
                        //Check if username was found
                        if (usr) {
                            console.log("[ Signup ] Username is already picked, please choose another: " + req.body.username);
                            res.json({
                                error: ['Username ' + req.body.username + ' is already registered, please use another']
                            });
                        } else {
                            // Create new user
                            let newUser = new User();
                            newUser['full_name'] = req.body.full_name;
                            newUser['email'] = req.body.email;
                            newUser['password'] = newUser.generateHash(req.body.password);
                            newUser['username'] = req.body.username;
                            newUser['account_type'] = "free";
                            // if (req.body.email === god_mode_email) {
                            //     newUser.role = "admin";
                            //     newUser.permissions = ["all"];
                            // }
                            newUser.save((err,u) => {
                                let user = {
                                    _id: u._id
                                };
                                let token = jwt.sign(user, secret, {
                                    expiresIn: '7d'
                                }); // Expires in 1 week
                                res.json({
                                    user: u,
                                    token
                                });
                            }, function(err) {
                                console.log("[ auth ] Error saving new user".red, err);
                                let errObj = err.toJSON().errors;
                                let errArr = [];
                                for (let e in errObj) {
                                    if (!errObj.hasOwnProperty(e)) continue;
                                    errArr.push(errObj[e].message);
                                }
                                res.json({
                                    error: errArr
                                });
                            });
                        }
                    },
                    function(err) {
                        console.log("[ Signup ] Error finding one user".red, err);
                        res.json({
                            error: ['Error fetching user']
                        });
                    });
            }
        }, function(err) {
            console.log("[ Signup ] Error finding one user".red, err);
            res.json({
                error: ['Error fetching user']
            });
        });
    } else {
        res.json({
            error: ['Please submit a valid email address']
        });
    }
});

//Login
router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username) {
        if (username.indexOf('@') != -1) {
            User.findOne({
                'email': username
            }).exec().then(function(usr) {
                if (!usr || !usr.validPassword(password)) {
                    res.json({
                        error: ['Invalid email or password']
                    });
                } else {
                    // All is well, return auth token
                    let user = {
                        _id: usr._id
                    };
                    let token = jwt.sign(user, secret, {
                        expiresIn: '7d'
                    }); // Expires in 1 week

                    res.json({
                        token: token
                    });
                }
            }, function(err) {
                console.log("[ auth ] Error finding one user".red, err);
                res.json({
                    error: ['Error fetching user']
                });
            });
        } else {
            User.findOne({
                'username': username
            }).exec().then(function(usr) {
                if (!usr || !usr.validPassword(password)) {
                    res.json({
                        error: ['Invalid email or password']
                    });
                } else {
                    // All is well, return auth token
                    let user = {
                        _id: usr._id
                    };
                    let token = jwt.sign(user, secret, {
                        expiresIn: '7d'
                    }); // Expires in 1 week

                    console.log('[ auth ] Token: ' + token);
                    res.json({
                        token: token
                    });
                }
            }, function(err) {
                console.log("[ auth ] Error finding one user".red, err);
                res.json({
                    error: ['Error fetching user']
                });
            });
        }

    } else {
        res.json({
            error: ['Please submit a valid email address']
        });
    }
});

router.get('/api/users/profile', (req, res, next) => {
    if (!req.user) {
        res.json({
            error: ['Not authorized']
        });
    } else {
        User.findOne({
            '_id': req.user._id
        }, {
            'password': 0,
        }).exec().then(function(u) {
            if (u) {
                res.json(u);
            } else {
                res.json({
                    error: ['User not found']
                });
            }
        }, function(err) {
            console.log("[ users ] Error finding one user by _id".red, err);
            res.json({
                error: ['Error fetching user from database']
            });
        });
    }
});
module.exports = router;